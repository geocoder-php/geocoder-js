import {
  ExternalLoaderBody,
  ExternalLoaderHeaders,
  ExternalLoaderInterface,
  ExternalLoaderParams,
} from "ExternalLoader";
import {
  BingGeocoded,
  ErrorCallback,
  GeocodedResultsCallback,
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
import { FlatBoundingBox, FlatCoordinates } from "types";
import AdminLevel from "AdminLevel";
import { ResponseError } from "error";

interface BingRequestParams {
  [param: string]: string | undefined;
  readonly key?: string;
  readonly inclnb?: string;
  readonly incl?: string;
  readonly maxRes?: string;
  readonly includeEntityTypes?: string;
  readonly c?: string;
  readonly jsonpCallback?: string;
}

export type BingPrecision = "High" | "Medium" | "Low";

export interface BingResult {
  __type: string;
  bbox: FlatBoundingBox;
  name: string;
  point: {
    type: string;
    coordinates: FlatCoordinates;
  };
  address: {
    addressLine: string;
    neighborhood?: string;
    adminDistrict: string;
    adminDistrict2: string;
    countryRegion: string;
    countryRegionIso2?: string;
    landmark?: string;
    formattedAddress: string;
    locality: string;
    postalCode: string;
  };
  confidence: BingPrecision;
  entityType: string;
  geocodePoints: {
    type: string;
    coordinates: FlatCoordinates;
    calculationMethod:
      | "Interpolation"
      | "InterpolationOffset"
      | "Parcel"
      | "Rooftop";
    usageTypes: ("Display" | "Route")[];
  }[];
  queryParseValues?: {
    property:
      | " AddressLine"
      | "Locality"
      | "AdminDistrict"
      | "AdminDistrict2"
      | "PostalCode"
      | "CountryRegion"
      | "Landmark";
    value: string;
  };
  matchCodes: ("Good" | "Ambiguous" | "UpHierarchy")[];
}

export interface BingResponse {
  statusCode: number;
  statusDescription: string | null;
  authenticationResultCode:
    | "ValidCredentials"
    | "InvalidCredentials"
    | "CredentialsExpired"
    | "NotAuthorized"
    | "NoCredentials"
    | "None";
  traceId: string;
  copyright: string;
  brandLogoUri: string;
  resourceSets: {
    estimatedTotal: number;
    resources: BingResult[];
  }[];
  errorDetails?: string[];
}

export interface BingProviderOptionsInterface extends ProviderOptionsInterface {
  readonly apiKey: string;
}

export const defaultBingProviderOptions = {
  ...defaultProviderOptions,
  apiKey: "",
};

type BingGeocodedResultsCallback = GeocodedResultsCallback<BingGeocoded>;

export default class BingProvider implements ProviderInterface<BingGeocoded> {
  private externalLoader: ExternalLoaderInterface;

  private options: BingProviderOptionsInterface;

  public constructor(
    _externalLoader: ExternalLoaderInterface,
    options: BingProviderOptionsInterface = defaultBingProviderOptions
  ) {
    this.externalLoader = _externalLoader;
    this.options = { ...defaultBingProviderOptions, ...options };
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

    const params: BingRequestParams = this.withCommonParams(
      {
        maxRes: geocodeQuery.getLimit()
          ? geocodeQuery.getLimit().toString()
          : undefined,
      },
      geocodeQuery
    );

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

    const params: BingRequestParams = this.withCommonParams({}, reverseQuery);

    this.executeRequest(params, reverseCallback, {}, {}, reverseErrorCallback);
  }

  private withCommonParams(
    params: Pick<BingRequestParams, "maxRes">,
    query: GeocodeQuery | ReverseQuery
  ): BingRequestParams {
    return {
      ...params,
      key: this.options.apiKey,
      incl: "ciso2",
      c: query.getLocale(),
      jsonpCallback: this.options.useJsonp ? "jsonp" : undefined,
    };
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
      (data: BingResponse) => {
        callback(
          data.resourceSets[0].resources.map((result: BingResult) =>
            BingProvider.mapToGeocoded(result, data.copyright)
          )
        );
      },
      headers,
      body,
      (error) => {
        const response = <Response>error.getResponse();
        response.json().then((data: BingResponse) => {
          const errorMessage =
            data.errorDetails && data.errorDetails.length > 0
              ? data.errorDetails[0]
              : data.statusDescription || "";
          if (errorCallback) {
            errorCallback(new ResponseError(errorMessage, data));
            return;
          }
          setTimeout(() => {
            throw new Error(errorMessage);
          });
        });
      }
    );
  }

  public static mapToGeocoded(
    result: BingResult,
    attribution?: string
  ): BingGeocoded {
    const latitude = result.point.coordinates[0];
    const longitude = result.point.coordinates[1];
    const { formattedAddress } = result.address;
    const streetName = result.address.addressLine;
    const { locality, postalCode } = result.address;
    const region = result.address.adminDistrict;
    const country = result.address.countryRegion;
    const countryCode = result.address.countryRegionIso2;
    const precision = result.confidence;

    let geocoded = BingGeocoded.create({
      coordinates: {
        latitude,
        longitude,
      },
      formattedAddress,
      streetName,
      locality,
      postalCode,
      region,
      country,
      countryCode,
      attribution,
      precision,
    });
    geocoded = <BingGeocoded>geocoded.withBounds({
      latitudeSW: result.bbox[0],
      longitudeSW: result.bbox[1],
      latitudeNE: result.bbox[2],
      longitudeNE: result.bbox[3],
    });

    const adminLevels: ("adminDistrict" | "adminDistrict2")[] = [
      "adminDistrict",
      "adminDistrict2",
    ];
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
