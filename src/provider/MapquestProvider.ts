import {
  ExternalLoaderBody,
  ExternalLoaderHeaders,
  ExternalLoaderInterface,
  ExternalLoaderParams,
} from "ExternalLoader";
import {
  ErrorCallback,
  GeocodedResultsCallback,
  ProviderHelpers,
  ProviderInterface,
  ProviderOptionsInterface,
  defaultProviderOptions,
} from "provider";
import Geocoded from "Geocoded";
import {
  GeocodeQuery,
  GeocodeQueryObject,
  ReverseQuery,
  ReverseQueryObject,
} from "query";

interface MapQuestRequestParams {
  [param: string]: string | undefined;
  readonly key?: string;
  readonly location: string;
  readonly jsonpCallback?: string;
}

export interface MapQuestResult {
  latLng: {
    lat: number;
    lng: number;
  };
  displayLatLng: {
    lat: number;
    lng: number;
  };
  street: string;
  sideOfStreet: string;
  adminArea1?: string;
  adminArea1Type?: string;
  adminArea3?: string;
  adminArea3Type?: string;
  adminArea4?: string;
  adminArea4Type?: string;
  adminArea5?: string;
  adminArea5Type?: string;
  adminArea6?: string;
  adminArea6Type?: string;
  postalCode: string;
  type: string;
  linkId: string;
  dragPoint: boolean;
  geocodeQuality: string;
  geocodeQualityCode: string;
}

type MapQuestGeocodedResultsCallback = GeocodedResultsCallback<Geocoded>;

export default class MapQuestProvider implements ProviderInterface<Geocoded> {
  private externalLoader: ExternalLoaderInterface;

  private options: ProviderOptionsInterface;

  public constructor(
    _externalLoader: ExternalLoaderInterface,
    options: ProviderOptionsInterface = defaultProviderOptions
  ) {
    this.externalLoader = _externalLoader;
    this.options = { ...defaultProviderOptions, ...options };
    if (!this.options.apiKey) {
      throw new Error(
        'An API key is required for the MapQuest provider. Please add it in the "apiKey" option.'
      );
    }
  }

  public geocode(
    query: string | GeocodeQuery | GeocodeQueryObject,
    callback: MapQuestGeocodedResultsCallback,
    errorCallback?: ErrorCallback
  ): void {
    const geocodeQuery = ProviderHelpers.getGeocodeQueryFromParameter(query);

    if (geocodeQuery.getIp()) {
      throw new Error(
        "The MapQuest provider does not support IP geolocation, only location geocoding."
      );
    }

    this.externalLoader.setOptions({
      protocol: this.options.useSsl ? "https" : "http",
      host: "www.mapquestapi.com",
      pathname: "geocoding/v1/address",
    });

    const params: MapQuestRequestParams = {
      key: this.options.apiKey,
      location: geocodeQuery.getText() || "",
      jsonpCallback: this.options.useJsonp ? "callback" : undefined,
    };

    this.executeRequest(params, callback, {}, {}, errorCallback);
  }

  public geodecode(
    latitudeOrQuery: number | string | ReverseQuery | ReverseQueryObject,
    longitudeOrCallback: number | string | MapQuestGeocodedResultsCallback,
    callbackOrErrorCallback?: MapQuestGeocodedResultsCallback | ErrorCallback,
    errorCallback?: ErrorCallback
  ): void {
    const reverseQuery = ProviderHelpers.getReverseQueryFromParameters(
      latitudeOrQuery,
      longitudeOrCallback
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
      host: "www.mapquestapi.com",
      pathname: "geocoding/v1/reverse",
    });

    const params: MapQuestRequestParams = {
      key: this.options.apiKey,
      location: `${reverseQuery.getCoordinates().latitude},${
        reverseQuery.getCoordinates().longitude
      }`,
      jsonpCallback: this.options.useJsonp ? "callback" : undefined,
    };

    this.executeRequest(params, reverseCallback, {}, {}, reverseErrorCallback);
  }

  public executeRequest(
    params: ExternalLoaderParams,
    callback: MapQuestGeocodedResultsCallback,
    headers?: ExternalLoaderHeaders,
    body?: ExternalLoaderBody,
    errorCallback?: ErrorCallback
  ): void {
    this.externalLoader.executeRequest(
      params,
      (data) => {
        callback(
          data.results[0].locations.map((result: MapQuestResult) =>
            MapQuestProvider.mapToGeocoded(result)
          )
        );
      },
      headers,
      body,
      errorCallback
    );
  }

  public static mapToGeocoded(result: MapQuestResult): Geocoded {
    const latitude = result.latLng.lat;
    const longitude = result.latLng.lng;
    const streetName = result.street;
    const subLocality = result.adminArea6;
    const locality = result.adminArea5;
    const { postalCode } = result;
    const region = result.adminArea4;
    const country = result.adminArea1;
    const countryCode = result.adminArea1;

    return Geocoded.create({
      latitude,
      longitude,
      streetName,
      subLocality,
      locality,
      postalCode,
      region,
      country,
      countryCode,
    });
  }
}
