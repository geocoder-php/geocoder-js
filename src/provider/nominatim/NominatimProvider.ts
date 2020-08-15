import {
  ExternalLoaderBody,
  ExternalLoaderHeaders,
  ExternalLoaderInterface,
  ExternalLoaderParams,
} from "ExternalLoader";
import {
  ErrorCallback,
  GeocodedResultsCallback,
  NominatimGeocoded,
  NominatimReverseQuery,
  NominatimReverseQueryObject,
  NominatimGeocodeQueryObject,
  NominatimGeocodeQuery,
  ProviderHelpers,
  ProviderInterface,
  ProviderOptionsInterface,
  defaultProviderOptions,
} from "provider";
import AdminLevel from "AdminLevel";
import { ResponseError } from "error";

interface NominatimRequestParams {
  [param: string]: string | undefined;
  readonly q?: string;
  readonly lat?: string;
  readonly lon?: string;
  readonly format: string;
  readonly addressdetails: string;
  readonly zoom?: string;
  readonly limit?: string;
  // eslint-disable-next-line camelcase
  readonly "accept-language"?: string;
  readonly countrycodes?: string;
  // eslint-disable-next-line camelcase
  readonly exclude_place_ids?: string;
  readonly viewbox?: string;
  readonly bounded?: string;
  readonly jsonpCallback?: string;
}

interface NominatimErrorResponse {
  error: string;
}

export type NominatimResponse =
  | NominatimErrorResponse
  | NominatimResult
  | NominatimResult[];

export interface NominatimResult {
  // eslint-disable-next-line camelcase
  place_id: number;
  licence: string;
  // eslint-disable-next-line camelcase
  osm_type: string;
  // eslint-disable-next-line camelcase
  osm_id: number;
  boundingbox: [string, string, string, string];
  lat: string;
  lon: string;
  // eslint-disable-next-line camelcase
  display_name: string;
  category: string;
  type: string;
  importance: number;
  icon: string;
  address: {
    attraction?: string;
    // eslint-disable-next-line camelcase
    house_number?: string;
    road?: string;
    pedestrian?: string;
    neighbourhood?: string;
    suburb?: string;
    city?: string;
    town?: string;
    village?: string;
    hamlet?: string;
    state?: string;
    county?: string;
    postcode?: string;
    country?: string;
    // eslint-disable-next-line camelcase
    country_code?: string;
  };
}

export interface NominatimProviderOptionsInterface
  extends ProviderOptionsInterface {
  readonly host?: string;
  readonly userAgent: string;
  readonly referer?: string;
}

export const defaultNominatimProviderOptions = {
  ...defaultProviderOptions,
  host: "nominatim.openstreetmap.org",
  userAgent: "",
};

type NominatimGeocodedResultsCallback = GeocodedResultsCallback<
  NominatimGeocoded
>;

export default class NominatimProvider
  implements ProviderInterface<NominatimGeocoded> {
  private externalLoader: ExternalLoaderInterface;

  private options: NominatimProviderOptionsInterface;

  public constructor(
    _externalLoader: ExternalLoaderInterface,
    options: NominatimProviderOptionsInterface = defaultNominatimProviderOptions
  ) {
    this.externalLoader = _externalLoader;
    this.options = { ...defaultNominatimProviderOptions, ...options };
    if (
      this.options.host === defaultNominatimProviderOptions.host &&
      !this.options.userAgent
    ) {
      throw new Error(
        'An User-Agent identifying your application is required for the OpenStreetMap / Nominatim provider when using the default host. Please add it in the "userAgent" option.'
      );
    }
  }

  public geocode(
    query: string | NominatimGeocodeQuery | NominatimGeocodeQueryObject,
    callback: NominatimGeocodedResultsCallback,
    errorCallback?: ErrorCallback
  ): void {
    const geocodeQuery = ProviderHelpers.getGeocodeQueryFromParameter(
      query,
      NominatimGeocodeQuery
    );

    if (geocodeQuery.getIp()) {
      throw new Error(
        "The OpenStreetMap / Nominatim provider does not support IP geolocation, only location geocoding."
      );
    }

    this.externalLoader.setOptions({
      protocol: this.options.useSsl ? "https" : "http",
      host: this.options.host,
      pathname: "search",
    });

    const params: NominatimRequestParams = this.withCommonParams(
      {
        q: geocodeQuery.getText(),
        limit: geocodeQuery.getLimit().toString(),
        countrycodes: (<NominatimGeocodeQuery>geocodeQuery).getCountryCodes()
          ? (<NominatimGeocodeQuery>geocodeQuery).getCountryCodes()?.join(",")
          : undefined,
        exclude_place_ids: (<NominatimGeocodeQuery>(
          geocodeQuery
        )).getExcludePlaceIds()
          ? (<NominatimGeocodeQuery>geocodeQuery)
              .getExcludePlaceIds()
              ?.join(",")
          : undefined,
        viewbox: (<NominatimGeocodeQuery>geocodeQuery).getViewBox()
          ? (<NominatimGeocodeQuery>geocodeQuery).getViewBox()?.join(",")
          : undefined,
        bounded: (<NominatimGeocodeQuery>geocodeQuery).getBounded()
          ? (<NominatimGeocodeQuery>geocodeQuery).getBounded()?.toString()
          : undefined,
      },
      <NominatimGeocodeQuery>geocodeQuery
    );

    this.executeRequest(params, callback, this.getHeaders(), {}, errorCallback);
  }

  public geodecode(
    latitudeOrQuery:
      | number
      | string
      | NominatimReverseQuery
      | NominatimReverseQueryObject,
    longitudeOrCallback: number | string | NominatimGeocodedResultsCallback,
    callbackOrErrorCallback?: NominatimGeocodedResultsCallback | ErrorCallback,
    errorCallback?: ErrorCallback
  ): void {
    const reverseQuery = ProviderHelpers.getReverseQueryFromParameters(
      latitudeOrQuery,
      longitudeOrCallback,
      NominatimReverseQuery
    );
    const reverseCallback = ProviderHelpers.getCallbackFromParameters(
      longitudeOrCallback,
      callbackOrErrorCallback
    );
    const reverseErrorCallback = ProviderHelpers.getErrorCallbackFromParameters(
      longitudeOrCallback,
      callbackOrErrorCallback,
      errorCallback
    );

    this.externalLoader.setOptions({
      protocol: this.options.useSsl ? "https" : "http",
      host: this.options.host,
      pathname: "reverse",
    });

    const params: NominatimRequestParams = this.withCommonParams(
      {
        lat: reverseQuery.getCoordinates().latitude.toString(),
        lon: reverseQuery.getCoordinates().longitude.toString(),
        zoom:
          (<NominatimReverseQuery>reverseQuery).getZoom()?.toString() || "18",
      },
      <NominatimReverseQuery>reverseQuery
    );

    this.executeRequest(
      params,
      reverseCallback,
      this.getHeaders(),
      {},
      reverseErrorCallback
    );
  }

  private withCommonParams(
    params: Partial<NominatimRequestParams>,
    query: NominatimGeocodeQuery | NominatimReverseQuery
  ): NominatimRequestParams {
    return {
      ...params,
      format: "jsonv2",
      addressdetails: "1",
      jsonpCallback: this.options.useJsonp ? "json_callback" : undefined,
      "accept-language": query.getLocale(),
    };
  }

  private getHeaders(): ExternalLoaderHeaders {
    return {
      "User-Agent": this.options.userAgent || "",
      Referer: this.options.referer,
    };
  }

  public executeRequest(
    params: ExternalLoaderParams,
    callback: NominatimGeocodedResultsCallback,
    headers?: ExternalLoaderHeaders,
    body?: ExternalLoaderBody,
    errorCallback?: ErrorCallback
  ): void {
    this.externalLoader.executeRequest(
      params,
      (data: NominatimResponse) => {
        let results = data;
        if (!Array.isArray(data)) {
          if ((<NominatimErrorResponse>data).error) {
            const errorMessage = `An error has occurred: ${
              (<NominatimErrorResponse>data).error
            }`;
            if (errorCallback) {
              errorCallback(new ResponseError(errorMessage, data));
              return;
            }
            setTimeout(() => {
              throw new Error(errorMessage);
            });
            return;
          }
          results = [<NominatimResult>data];
        }
        callback(
          (<NominatimResult[]>results).map((result: NominatimResult) =>
            NominatimProvider.mapToGeocoded(result)
          )
        );
      },
      headers,
      body,
      errorCallback
    );
  }

  public static mapToGeocoded(result: NominatimResult): NominatimGeocoded {
    const latitude = parseFloat(result.lat);
    const longitude = parseFloat(result.lon);
    const displayName = result.display_name;
    const streetNumber = result.address.house_number;
    const streetName = result.address.road || result.address.pedestrian;
    const subLocality = result.address.suburb;
    let locality: string | undefined;
    const postalCode = result.address.postcode
      ? result.address.postcode.split(";")[0]
      : undefined;
    const region = result.address.state;
    const { country } = result.address;
    const countryCode = result.address.country_code;
    const osmId = result.osm_id;
    const osmType = result.osm_type;
    const { category } = result;
    const { type } = result;
    const attribution = result.licence;

    const localityTypes: ("city" | "town" | "village" | "hamlet")[] = [
      "city",
      "town",
      "village",
      "hamlet",
    ];
    localityTypes.forEach((localityType) => {
      if (result.address[localityType] && !locality) {
        locality = result.address[localityType];
      }
    });

    let geocoded = NominatimGeocoded.create({
      latitude,
      longitude,
      displayName,
      streetNumber,
      streetName,
      subLocality,
      locality,
      postalCode,
      region,
      country,
      countryCode,
      osmId,
      osmType,
      category,
      type,
      attribution,
    });

    geocoded = <NominatimGeocoded>(
      geocoded.withBounds(
        parseFloat(result.boundingbox[0]),
        parseFloat(result.boundingbox[2]),
        parseFloat(result.boundingbox[1]),
        parseFloat(result.boundingbox[3])
      )
    );

    const adminLevels: ("state" | "county")[] = ["state", "county"];
    adminLevels.forEach((adminLevel, level) => {
      if (result.address[adminLevel]) {
        geocoded.addAdminLevel(
          AdminLevel.create({
            level: level + 1,
            name: result.address[adminLevel] || "",
          })
        );
      }
    });

    return geocoded;
  }
}
