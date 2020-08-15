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
import { Box } from "types";

interface BingRequestParams {
  [param: string]: string | undefined;
  readonly key?: string;
  readonly jsonpCallback?: string;
}

export interface BingResult {
  __type: string;
  bbox: Box;
  name: string;
  point: {
    type: string;
    coordinates: [number, number];
  };
  address: {
    addressLine: string;
    adminDistrict: string;
    adminDistrict2: string;
    countryRegion: string;
    formattedAddress: string;
    locality: string;
    postalCode: string;
  };
  confidence: string;
  entityType: string;
  geocodePoints: {
    type: string;
    coordinates: [number, number];
    calculationMethod: string;
    usageTypes: string[];
  }[];
  matchCodes: string[];
}

type BingGeocodedResultsCallback = GeocodedResultsCallback<Geocoded>;

export default class BingProvider implements ProviderInterface<Geocoded> {
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
        'An API key is required for the Bing provider. Please add it in the "apiKey" option.'
      );
    }
  }

  public geocode(
    query: string | GeocodeQuery | GeocodeQueryObject,
    callback: BingGeocodedResultsCallback,
    errorCallback?: ErrorCallback
  ): void {
    const geocodeQuery = ProviderHelpers.getGeocodeQueryFromParameter(query);

    if (geocodeQuery.getIp()) {
      throw new Error(
        "The Bing provider does not support IP geolocation, only location geocoding."
      );
    }

    this.externalLoader.setOptions({
      protocol: this.options.useSsl ? "https" : "http",
      host: "dev.virtualearth.net",
      pathname: `REST/v1/Locations/${geocodeQuery.getText()}`,
    });

    const params: BingRequestParams = {
      key: this.options.apiKey,
      jsonpCallback: this.options.useJsonp ? "jsonp" : undefined,
    };

    this.executeRequest(params, callback, {}, {}, errorCallback);
  }

  public geodecode(
    latitudeOrQuery: number | string | ReverseQuery | ReverseQueryObject,
    longitudeOrCallback: number | string | BingGeocodedResultsCallback,
    callbackOrErrorCallback?: BingGeocodedResultsCallback | ErrorCallback,
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
      host: "dev.virtualearth.net",
      pathname: `REST/v1/Locations/${reverseQuery.getCoordinates().latitude},${
        reverseQuery.getCoordinates().longitude
      }`,
    });

    const params: BingRequestParams = {
      key: this.options.apiKey,
      jsonpCallback: this.options.useJsonp ? "jsonp" : undefined,
    };

    this.executeRequest(params, reverseCallback, {}, {}, reverseErrorCallback);
  }

  public executeRequest(
    params: ExternalLoaderParams,
    callback: BingGeocodedResultsCallback,
    headers?: ExternalLoaderHeaders,
    body?: ExternalLoaderBody,
    errorCallback?: ErrorCallback
  ): void {
    this.externalLoader.executeRequest(
      params,
      (data) => {
        callback(
          data.resourceSets[0].resources.map((result: BingResult) =>
            BingProvider.mapToGeocoded(result)
          )
        );
      },
      headers,
      body,
      errorCallback
    );
  }

  public static mapToGeocoded(result: BingResult): Geocoded {
    const latitude = result.point.coordinates[0];
    const longitude = result.point.coordinates[1];
    const { formattedAddress } = result.address;
    const streetName = result.address.addressLine;
    const { locality, postalCode } = result.address;
    const region = result.address.adminDistrict;
    const country = result.address.countryRegion;

    let geocoded = Geocoded.create({
      latitude,
      longitude,
      formattedAddress,
      streetName,
      locality,
      postalCode,
      region,
      country,
    });
    geocoded = geocoded.withBounds(
      result.bbox[0],
      result.bbox[1],
      result.bbox[2],
      result.bbox[3]
    );

    return geocoded;
  }
}
