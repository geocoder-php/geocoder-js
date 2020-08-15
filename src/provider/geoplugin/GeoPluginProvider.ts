import {
  ExternalLoaderBody,
  ExternalLoaderHeaders,
  ExternalLoaderInterface,
  ExternalLoaderParams,
} from "ExternalLoader";
import {
  ErrorCallback,
  GeocodedResultsCallback,
  GeoPluginGeocoded,
  ProviderHelpers,
  ProviderInterface,
  ProviderOptionsInterface,
  defaultProviderOptions,
} from "provider";
import {
  GeocodeQuery,
  GeocodeQueryObject,
  ReverseQuery,
  ReverseQueryObject,
} from "query";
import { ResponseError } from "error";
import AdminLevel from "AdminLevel";

interface GeoPluginRequestParams {
  [param: string]: string | undefined;
  readonly ip: string;
}

export interface GeoPluginResult {
  // eslint-disable-next-line camelcase
  geoplugin_request: string;
  // eslint-disable-next-line camelcase
  geoplugin_status: number;
  // eslint-disable-next-line camelcase
  geoplugin_delay: string;
  // eslint-disable-next-line camelcase
  geoplugin_credit: string;
  // eslint-disable-next-line camelcase
  geoplugin_city: string;
  // eslint-disable-next-line camelcase
  geoplugin_region: string;
  // eslint-disable-next-line camelcase
  geoplugin_regionCode: string;
  // eslint-disable-next-line camelcase
  geoplugin_regionName: string;
  // eslint-disable-next-line camelcase
  geoplugin_areaCode: string;
  // eslint-disable-next-line camelcase
  geoplugin_dmaCode: string;
  // eslint-disable-next-line camelcase
  geoplugin_countryCode: string;
  // eslint-disable-next-line camelcase
  geoplugin_countryName: string;
  // eslint-disable-next-line camelcase
  geoplugin_inEU: boolean;
  // eslint-disable-next-line camelcase
  geoplugin_euVATrate: number;
  // eslint-disable-next-line camelcase
  geoplugin_continentCode: string;
  // eslint-disable-next-line camelcase
  geoplugin_continentName: string;
  // eslint-disable-next-line camelcase
  geoplugin_latitude: string;
  // eslint-disable-next-line camelcase
  geoplugin_longitude: string;
  // eslint-disable-next-line camelcase
  geoplugin_locationAccuracyRadius: string;
  // eslint-disable-next-line camelcase
  geoplugin_timezone: string;
  // eslint-disable-next-line camelcase
  geoplugin_currencyCode: string;
  // eslint-disable-next-line camelcase
  geoplugin_currencySymbol: string;
  // eslint-disable-next-line camelcase
  geoplugin_currencySymbol_UTF8: string;
  // eslint-disable-next-line camelcase
  geoplugin_currencyConverter: string;
}

type GeoPluginGeocodedResultsCallback = GeocodedResultsCallback<
  GeoPluginGeocoded
>;

export default class GeoPluginProvider
  implements ProviderInterface<GeoPluginGeocoded> {
  private externalLoader: ExternalLoaderInterface;

  private options: ProviderOptionsInterface;

  public constructor(
    _externalLoader: ExternalLoaderInterface,
    options: ProviderOptionsInterface = defaultProviderOptions
  ) {
    this.externalLoader = _externalLoader;
    this.options = { ...defaultProviderOptions, ...options };
  }

  public geocode(
    query: string | GeocodeQuery | GeocodeQueryObject,
    callback: GeoPluginGeocodedResultsCallback,
    errorCallback?: ErrorCallback
  ): void {
    const geocodeQuery = ProviderHelpers.getGeocodeQueryFromParameter(query);

    if (geocodeQuery.getText()) {
      throw new Error(
        "The GeoPlugin provider does not support location geocoding, only IP geolocation."
      );
    }

    if (["127.0.0.1", "::1"].includes(geocodeQuery.getIp() || "")) {
      callback([
        GeoPluginGeocoded.create({
          locality: "localhost",
          country: "localhost",
        }),
      ]);
      return;
    }

    this.externalLoader.setOptions({
      protocol: this.options.useSsl ? "https" : "http",
      host: "www.geoplugin.net",
      pathname: "json.gp",
    });

    const params: GeoPluginRequestParams = {
      ip: geocodeQuery.getIp() || "",
    };

    this.executeRequest(params, callback, {}, {}, errorCallback);
  }

  // eslint-disable-next-line class-methods-use-this
  public geodecode(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    latitudeOrQuery: number | string | ReverseQuery | ReverseQueryObject,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    longitudeOrCallback: number | string | GeoPluginGeocodedResultsCallback,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    callbackOrErrorCallback?: GeoPluginGeocodedResultsCallback | ErrorCallback,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    errorCallback?: ErrorCallback
  ): void {
    throw new Error(
      "The GeoPlugin provider does not support reverse geocoding."
    );
  }

  public executeRequest(
    params: ExternalLoaderParams,
    callback: GeoPluginGeocodedResultsCallback,
    headers?: ExternalLoaderHeaders,
    body?: ExternalLoaderBody,
    errorCallback?: ErrorCallback
  ): void {
    this.externalLoader.executeRequest(
      params,
      (data: GeoPluginResult) => {
        if (![200, 206].includes(data.geoplugin_status)) {
          const errorMessage = `An error has occurred. Status: ${data.geoplugin_status}.`;
          if (errorCallback) {
            errorCallback(new ResponseError(errorMessage, data));
            return;
          }
          setTimeout(() => {
            throw new Error(errorMessage);
          });
          return;
        }
        callback([GeoPluginProvider.mapToGeocoded(data)]);
      },
      headers,
      body,
      errorCallback
    );
  }

  public static mapToGeocoded(result: GeoPluginResult): GeoPluginGeocoded {
    const latitude = parseFloat(result.geoplugin_latitude);
    const longitude = parseFloat(result.geoplugin_longitude);
    const locality = result.geoplugin_city || undefined;
    const region = result.geoplugin_region || undefined;
    const country = result.geoplugin_countryName || undefined;
    const countryCode = result.geoplugin_countryCode || undefined;
    const timezone = result.geoplugin_timezone || undefined;
    const adminLevels: AdminLevel[] = [];
    const attribution = result.geoplugin_credit || undefined;

    if (result.geoplugin_regionName) {
      adminLevels.push(
        AdminLevel.create({
          level: 1,
          name: result.geoplugin_regionName,
          code: result.geoplugin_regionCode || undefined,
        })
      );
    }

    const geocoded = GeoPluginGeocoded.create({
      latitude,
      longitude,
      locality,
      region,
      adminLevels,
      country,
      countryCode,
      timezone,
      attribution,
    });

    return geocoded;
  }
}
