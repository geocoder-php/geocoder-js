import {
  ExternalLoaderBody,
  ExternalLoaderHeaders,
  ExternalLoaderInterface,
  ExternalLoaderParams,
} from "ExternalLoader";
import {
  ErrorCallback,
  GeocodedResultsCallback,
  GoogleMapsGeocoded,
  GoogleMapsGeocodeQuery,
  GoogleMapsGeocodeQueryObject,
  GoogleMapsReverseQuery,
  GoogleMapsReverseQueryObject,
  ProviderHelpers,
  ProviderInterface,
  ProviderOptionsInterface,
  defaultProviderOptions,
} from "provider";
import AdminLevel from "AdminLevel";
import { ResponseError } from "error";
import {
  decodeBase64,
  decodeUrlSafeBase64,
  encodeUrlSafeBase64,
  filterUndefinedObjectValues,
  getRequireFunc,
  isBrowser,
} from "utils";

interface GoogleMapsRequestParams {
  [param: string]: string | undefined;
  readonly key?: string;
  readonly client?: string;
  readonly signature?: string;
  readonly channel?: string;
  readonly region?: string;
  readonly language?: string;
  readonly limit?: string;
  readonly address?: string;
  readonly components?: string;
  readonly bounds?: string;
  readonly latlng?: string;
  // eslint-disable-next-line camelcase
  readonly result_type?: string;
  // eslint-disable-next-line camelcase
  readonly location_type?: string;
}

interface GoogleMapsLatLng {
  lat: number;
  lng: number;
}

type GoogleMapsPlaceType =
  | "airport"
  | "administrative_area_level_1"
  | "administrative_area_level_2"
  | "administrative_area_level_3"
  | "administrative_area_level_4"
  | "administrative_area_level_5"
  | "archipelago"
  | "bus_station"
  | "colloquial_area"
  | "continent"
  | "country"
  | "establishment"
  | "finance"
  | "floor"
  | "food"
  | "general_contractor"
  | "geocode"
  | "health"
  | "intersection"
  | "locality"
  | "natural_feature"
  | "neighborhood"
  | "park"
  | "parking"
  | "place_of_worship"
  | "plus_code"
  | "point_of_interest"
  | "political"
  | "post_box"
  | "postal_code"
  | "postal_code_prefix"
  | "postal_code_suffix"
  | "postal_town"
  | "premise"
  | "room"
  | "route"
  | "street_address"
  | "street_number"
  | "sublocality"
  | "sublocality_level_1"
  | "sublocality_level_2"
  | "sublocality_level_3"
  | "sublocality_level_4"
  | "sublocality_level_5"
  | "subpremise"
  | "town_square"
  | "train_station"
  | "transit_station"
  | "ward";

export interface GoogleMapsResponse {
  results: GoogleMapsResult[];
  status:
    | "OK"
    | "ZERO_RESULTS"
    | "OVER_DAILY_LIMIT"
    | "OVER_QUERY_LIMIT"
    | "REQUEST_DENIED"
    | "INVALID_REQUEST"
    | "UNKNOWN_ERROR";
  // eslint-disable-next-line camelcase
  error_message?: string;
}

export interface GoogleMapsResult {
  geometry: {
    location: GoogleMapsLatLng;
    // eslint-disable-next-line camelcase
    location_type:
      | "ROOFTOP"
      | "RANGE_INTERPOLATED"
      | "GEOMETRIC_CENTER"
      | "APPROXIMATE";
    viewport: {
      northeast: GoogleMapsLatLng;
      southwest: GoogleMapsLatLng;
    };
    bounds?: {
      northeast: GoogleMapsLatLng;
      southwest: GoogleMapsLatLng;
    };
  };
  // eslint-disable-next-line camelcase
  formatted_address: string;
  // eslint-disable-next-line camelcase
  address_components: {
    types: GoogleMapsPlaceType[];
    // eslint-disable-next-line camelcase
    long_name: string;
    // eslint-disable-next-line camelcase
    short_name: string;
  }[];
  // eslint-disable-next-line camelcase
  place_id: string;
  // eslint-disable-next-line camelcase
  plus_code?: {
    // eslint-disable-next-line camelcase
    global_code: string;
    // eslint-disable-next-line camelcase
    compound_code?: string;
  };
  types: GoogleMapsPlaceType[];
  // eslint-disable-next-line camelcase
  postcode_localities?: string[];
  // eslint-disable-next-line camelcase
  partial_match?: boolean;
}

export interface GoogleMapsProviderOptionsInterface
  extends ProviderOptionsInterface {
  readonly apiKey?: string;
  readonly secret?: string;
  readonly clientId?: string;
  readonly countryCodes?: string[];
}

type GoogleMapsGeocodedResultsCallback = GeocodedResultsCallback<
  GoogleMapsGeocoded
>;

export default class GoogleMapsProvider
  implements ProviderInterface<GoogleMapsGeocoded> {
  private externalLoader: ExternalLoaderInterface;

  private options: GoogleMapsProviderOptionsInterface;

  public constructor(
    _externalLoader: ExternalLoaderInterface,
    options: GoogleMapsProviderOptionsInterface = defaultProviderOptions
  ) {
    this.externalLoader = _externalLoader;
    this.options = { ...defaultProviderOptions, ...options };
    if (!this.options.apiKey && !this.options.clientId) {
      throw new Error(
        'An API key or a client ID is required for the Google Maps provider. Please add it in the "apiKey" or the "clientId" option.'
      );
    }
    if (this.options.clientId && !this.options.secret) {
      throw new Error(
        'An URL signing secret is required if you use a client ID (Premium only). Please add it in the "secret" option.'
      );
    }
    if (this.options.secret && isBrowser()) {
      throw new Error(
        'The "secret" option cannot be used in a browser environment.'
      );
    }
    if (this.options.countryCodes && this.options.countryCodes.length !== 1) {
      throw new Error(
        'The "countryCodes" option must have only one country code top-level domain.'
      );
    }
  }

  public geocode(
    query: string | GoogleMapsGeocodeQuery | GoogleMapsGeocodeQueryObject,
    callback: GoogleMapsGeocodedResultsCallback,
    errorCallback?: ErrorCallback
  ): void {
    const geocodeQuery = ProviderHelpers.getGeocodeQueryFromParameter(
      query,
      GoogleMapsGeocodeQuery
    );

    if (geocodeQuery.getIp()) {
      throw new Error(
        "The GoogleMaps provider does not support IP geolocation, only location geocoding."
      );
    }

    this.externalLoader.setOptions({
      protocol: this.options.useSsl ? "https" : "http",
      host: "maps.googleapis.com",
      pathname: "maps/api/geocode/json",
    });

    const params: GoogleMapsRequestParams = this.withCommonParams(
      {
        address: geocodeQuery.getText(),
        bounds: geocodeQuery.getBounds()
          ? `${geocodeQuery.getBounds()?.south},${
              geocodeQuery.getBounds()?.west
            }|${geocodeQuery.getBounds()?.north},${
              geocodeQuery.getBounds()?.east
            }`
          : undefined,
        components: (<GoogleMapsGeocodeQuery>geocodeQuery).getComponents()
          ? (<GoogleMapsGeocodeQuery>geocodeQuery)
              .getComponents()
              ?.map((component) => `${component.name}:${component.value}`)
              .join("|")
          : undefined,
        region: (<GoogleMapsGeocodeQuery>geocodeQuery).getCountryCodes()
          ? (<GoogleMapsGeocodeQuery>geocodeQuery).getCountryCodes()?.join(",")
          : this.options.countryCodes?.join(","),
      },
      <GoogleMapsGeocodeQuery>geocodeQuery
    );

    this.executeRequest(params, callback, {}, {}, errorCallback);
  }

  public geodecode(
    latitudeOrQuery:
      | number
      | string
      | GoogleMapsReverseQuery
      | GoogleMapsReverseQueryObject,
    longitudeOrCallback: number | string | GoogleMapsGeocodedResultsCallback,
    callbackOrErrorCallback?: GoogleMapsGeocodedResultsCallback | ErrorCallback,
    errorCallback?: ErrorCallback
  ): void {
    const reverseQuery = ProviderHelpers.getReverseQueryFromParameters(
      latitudeOrQuery,
      longitudeOrCallback,
      GoogleMapsReverseQuery
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
      host: "maps.googleapis.com",
      pathname: "maps/api/geocode/json",
    });

    const params: GoogleMapsRequestParams = this.withCommonParams(
      {
        latlng: `${reverseQuery.getCoordinates().latitude},${
          reverseQuery.getCoordinates().longitude
        }`,
        result_type: (<GoogleMapsReverseQuery>reverseQuery).getResultTypes()
          ? (<GoogleMapsReverseQuery>reverseQuery).getResultTypes()?.join("|")
          : undefined,
        location_type: (<GoogleMapsReverseQuery>reverseQuery).getLocationTypes()
          ? (<GoogleMapsReverseQuery>reverseQuery).getLocationTypes()?.join("|")
          : undefined,
      },
      <GoogleMapsReverseQuery>reverseQuery
    );

    this.executeRequest(params, reverseCallback, {}, {}, reverseErrorCallback);
  }

  private withCommonParams(
    params: Pick<
      GoogleMapsRequestParams,
      | "address"
      | "bounds"
      | "components"
      | "latlng"
      | "location_type"
      | "region"
      | "result_type"
    >,
    query: GoogleMapsGeocodeQuery | GoogleMapsReverseQuery
  ): GoogleMapsRequestParams {
    let withCommonParams: GoogleMapsRequestParams = {
      ...params,
      key: this.options.apiKey,
      client: this.options.clientId,
      channel: query.getChannel(),
      language: query.getLocale(),
      limit: query.getLimit().toString(),
    };

    if (this.options.secret) {
      withCommonParams = {
        ...withCommonParams,
        signature: GoogleMapsProvider.signQuery(
          this.options.secret,
          this.externalLoader.getOptions().pathname || "",
          withCommonParams
        ),
      };
    }

    return withCommonParams;
  }

  public executeRequest(
    params: ExternalLoaderParams,
    callback: GoogleMapsGeocodedResultsCallback,
    headers?: ExternalLoaderHeaders,
    body?: ExternalLoaderBody,
    errorCallback?: ErrorCallback
  ): void {
    const { limit, ...externalLoaderParams } = params;

    this.externalLoader.executeRequest(
      externalLoaderParams,
      (data: GoogleMapsResponse) => {
        let errorMessage: undefined | string;
        switch (data.status) {
          case "REQUEST_DENIED":
            errorMessage = "Request has been denied";
            if (data.error_message) {
              errorMessage += `: ${data.error_message}`;
            }
            break;
          case "OVER_QUERY_LIMIT":
            errorMessage =
              "Exceeded daily quota when attempting geocoding request";
            if (data.error_message) {
              errorMessage += `: ${data.error_message}`;
            }
            break;
          case "OVER_DAILY_LIMIT":
            errorMessage = "API usage has been limited";
            if (data.error_message) {
              errorMessage += `: ${data.error_message}`;
            }
            break;
          case "INVALID_REQUEST":
            errorMessage = "The request is invalid";
            if (data.error_message) {
              errorMessage += `: ${data.error_message}`;
            }
            break;
          case "UNKNOWN_ERROR":
            errorMessage = "Unknown error";
            if (data.error_message) {
              errorMessage += `: ${data.error_message}`;
            }
            break;
          default:
          // Intentionnaly left empty
        }
        if (errorMessage && errorCallback) {
          errorCallback(new ResponseError(errorMessage, data));
          return;
        }
        if (errorMessage) {
          setTimeout(() => {
            throw new Error(errorMessage);
          });
          return;
        }

        const { results } = data;
        const resultsToRemove =
          results.length - parseInt(limit || results.length.toString(), 10);
        if (resultsToRemove > 0) {
          results.splice(-resultsToRemove);
        }

        callback(
          results.map((result: GoogleMapsResult) =>
            GoogleMapsProvider.mapToGeocoded(result)
          )
        );
      },
      headers,
      body,
      errorCallback
    );
  }

  public static mapToGeocoded(result: GoogleMapsResult): GoogleMapsGeocoded {
    const latitude = result.geometry.location.lat;
    const longitude = result.geometry.location.lng;
    const formattedAddress = result.formatted_address;
    let streetNumber;
    let streetName;
    let subLocality;
    let locality;
    let postalCode;
    let region;
    let country;
    let countryCode;
    const adminLevels: AdminLevel[] = [];
    const placeId = result.place_id;
    const partialMatch = result.partial_match;
    const resultType = result.types;
    const locationType = result.geometry.location_type;
    let streetAddress;
    let intersection;
    let political;
    let colloquialArea;
    let ward;
    let neighborhood;
    let premise;
    let subpremise;
    let naturalFeature;
    let airport;
    let park;
    let pointOfInterest;
    let establishment;
    let postalCodeSuffix;
    const subLocalityLevels: AdminLevel[] = [];

    result.address_components.forEach((addressComponent) => {
      addressComponent.types.forEach((type) => {
        switch (type) {
          case "street_number":
            streetNumber = addressComponent.long_name;
            break;
          case "route":
            streetName = addressComponent.long_name;
            break;
          case "sublocality":
            subLocality = addressComponent.long_name;
            break;
          case "locality":
          case "postal_town":
            locality = addressComponent.long_name;
            break;
          case "postal_code":
            postalCode = addressComponent.long_name;
            break;
          case "administrative_area_level_1":
          case "administrative_area_level_2":
          case "administrative_area_level_3":
          case "administrative_area_level_4":
          case "administrative_area_level_5":
            if (type === "administrative_area_level_1") {
              region = addressComponent.long_name;
            }

            adminLevels.push(
              AdminLevel.create({
                level: parseInt(type.substr(-1), 10),
                name: addressComponent.long_name,
                code: addressComponent.short_name,
              })
            );
            break;
          case "sublocality_level_1":
          case "sublocality_level_2":
          case "sublocality_level_3":
          case "sublocality_level_4":
          case "sublocality_level_5":
            subLocalityLevels.push(
              AdminLevel.create({
                level: parseInt(type.substr(-1), 10),
                name: addressComponent.long_name,
                code: addressComponent.short_name,
              })
            );
            break;
          case "country":
            country = addressComponent.long_name;
            countryCode = addressComponent.short_name;
            break;
          case "street_address":
            streetAddress = addressComponent.long_name;
            break;
          case "intersection":
            intersection = addressComponent.long_name;
            break;
          case "political":
            political = addressComponent.long_name;
            break;
          case "colloquial_area":
            colloquialArea = addressComponent.long_name;
            break;
          case "ward":
            ward = addressComponent.long_name;
            break;
          case "neighborhood":
            neighborhood = addressComponent.long_name;
            break;
          case "premise":
            premise = addressComponent.long_name;
            break;
          case "subpremise":
            subpremise = addressComponent.long_name;
            break;
          case "natural_feature":
            naturalFeature = addressComponent.long_name;
            break;
          case "airport":
            airport = addressComponent.long_name;
            break;
          case "park":
            park = addressComponent.long_name;
            break;
          case "point_of_interest":
            pointOfInterest = addressComponent.long_name;
            break;
          case "establishment":
            establishment = addressComponent.long_name;
            break;
          case "postal_code_suffix":
            postalCodeSuffix = addressComponent.long_name;
            break;
          default:
        }
      });
    });

    let geocoded = GoogleMapsGeocoded.create({
      latitude,
      longitude,
      formattedAddress,
      streetNumber,
      streetName,
      subLocality,
      locality,
      postalCode,
      region,
      country,
      countryCode,
      adminLevels,
      placeId,
      partialMatch,
      resultType,
      locationType,
      streetAddress,
      intersection,
      political,
      colloquialArea,
      ward,
      neighborhood,
      premise,
      subpremise,
      naturalFeature,
      airport,
      park,
      pointOfInterest,
      establishment,
      postalCodeSuffix,
      subLocalityLevels,
    });

    if (result.geometry.bounds) {
      const { bounds } = result.geometry;
      geocoded = <GoogleMapsGeocoded>(
        geocoded.withBounds(
          bounds.southwest.lat,
          bounds.southwest.lng,
          bounds.northeast.lat,
          bounds.northeast.lng
        )
      );
    } else if (result.geometry.viewport) {
      const { viewport } = result.geometry;
      geocoded = <GoogleMapsGeocoded>(
        geocoded.withBounds(
          viewport.southwest.lat,
          viewport.southwest.lng,
          viewport.northeast.lat,
          viewport.northeast.lng
        )
      );
    } else if (result.geometry.location_type === "ROOFTOP") {
      // Fake bounds
      geocoded = <GoogleMapsGeocoded>(
        geocoded.withBounds(latitude, longitude, latitude, longitude)
      );
    }

    return geocoded;
  }

  private static signQuery(
    secret: string,
    pathname: string,
    params: GoogleMapsRequestParams
  ): string {
    const crypto = getRequireFunc()("crypto");

    const filteredRequestParams = filterUndefinedObjectValues(params);

    const safeSecret = decodeBase64(decodeUrlSafeBase64(secret));
    const toSign = `${pathname}?${new URLSearchParams(
      filteredRequestParams
    ).toString()}`;
    const hashedSignature = encodeUrlSafeBase64(
      crypto.createHmac("sha1", safeSecret).update(toSign).digest("base64")
    );

    return hashedSignature;
  }
}
