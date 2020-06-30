import {
  ExternalLoaderInterface,
  ExternalLoaderParams,
} from "ExternalURILoader";
import {
  GeocodedResultsCallback,
  ProviderHelpers,
  ProviderInterface,
  ProviderOptionsInterface,
  defaultProviderOptions,
} from "providers";
import Geocoded from "Geocoded";
import {
  GeocodeQuery,
  GeocodeQueryObject,
  ReverseQuery,
  ReverseQueryObject,
} from "query";

interface GoogleApiRequestParams {
  [param: string]: string | undefined;
  readonly key: string;
  readonly sensor: string;
  readonly address?: string;
  readonly latlng?: string;
}

interface GoogleApiLatLng {
  lat: number;
  lng: number;
}

export interface GoogleApiResult {
  geometry: {
    location: GoogleApiLatLng;
    bounds: {
      southwest: GoogleApiLatLng;
      northeast: GoogleApiLatLng;
    };
  };
  // eslint-disable-next-line camelcase
  formatted_address: string;
  // eslint-disable-next-line camelcase
  address_components: {
    types: (
      | "street_number"
      | "route"
      | "sublocality"
      | "locality"
      | "postal_code"
      | "administrative_area_level_1"
      | "country"
    )[];
    // eslint-disable-next-line camelcase
    long_name: string;
    // eslint-disable-next-line camelcase
    short_name: string;
  }[];
}

export default class GoogleApiProvider implements ProviderInterface {
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
        'An API key is required for the Google API provider. Please add it in the "apiKey" option.'
      );
    }
  }

  public geocode(
    query: string | GeocodeQuery | GeocodeQueryObject,
    callback: GeocodedResultsCallback
  ): void {
    const geocodeQuery = ProviderHelpers.getGeocodeQueryFromParameter(query);

    this.externalLoader.setOptions({
      protocol: this.options.useSsl ? "https" : "http",
      host: "maps.googleapis.com",
      pathname: "maps/api/geocode/json",
    });

    const params: GoogleApiRequestParams = {
      key: this.options.apiKey || "",
      address: geocodeQuery.getText(),
      sensor: "0",
    };

    this.executeRequest(params, callback);
  }

  public geodecode(
    latitudeOrQuery: number | string | ReverseQuery | ReverseQueryObject,
    longitudeOrCallback: number | string | GeocodedResultsCallback,
    callback?: GeocodedResultsCallback
  ): void {
    const reverseQuery = ProviderHelpers.getReverseQueryFromParameters(
      latitudeOrQuery,
      longitudeOrCallback
    );
    const reverseCallback = ProviderHelpers.getCallbackFromParameters(
      longitudeOrCallback,
      callback
    );

    this.externalLoader.setOptions({
      protocol: this.options.useSsl ? "https" : "http",
      host: "maps.googleapis.com",
      pathname: "maps/api/geocode/json",
    });

    const params: GoogleApiRequestParams = {
      key: this.options.apiKey || "",
      latlng: `${reverseQuery.getCoordinates().latitude},${
        reverseQuery.getCoordinates().longitude
      }`,
      sensor: "0",
    };

    this.executeRequest(params, reverseCallback);
  }

  public executeRequest(
    params: ExternalLoaderParams,
    callback: GeocodedResultsCallback
  ): void {
    this.externalLoader.executeRequest(params, (data) => {
      if (data.status === "OVER_QUERY_LIMIT") {
        console.error(
          "Exceeded daily quota when attempting geocoding request."
        );
        callback([]);
        return;
      }

      callback(
        data.results.map((result: GoogleApiResult) =>
          GoogleApiProvider.mapToGeocoded(result)
        )
      );
    });
  }

  public static mapToGeocoded(result: GoogleApiResult): Geocoded {
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
            locality = addressComponent.long_name;
            break;
          case "postal_code":
            postalCode = addressComponent.long_name;
            break;
          case "administrative_area_level_1":
            region = addressComponent.long_name;
            break;
          case "country":
            country = addressComponent.long_name;
            countryCode = addressComponent.short_name;
            break;
          default:
        }
      });
    });

    let geocoded = Geocoded.create({
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
    });

    if (result.geometry.bounds) {
      const { bounds } = result.geometry;
      geocoded = geocoded.withBounds(
        bounds.southwest.lat,
        bounds.southwest.lng,
        bounds.northeast.lat,
        bounds.northeast.lng
      );
    }

    return geocoded;
  }
}
