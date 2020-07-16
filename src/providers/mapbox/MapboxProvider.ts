import {
  ExternalLoaderInterface,
  ExternalLoaderParams,
} from "ExternalURILoader";
import {
  GeocodedResultsCallback,
  MapboxGeocodeQuery,
  MapboxGeocodeQueryObject,
  MapboxReverseQuery,
  MapboxReverseQueryObject,
  ProviderHelpers,
  ProviderInterface,
  ProviderOptionsInterface,
  defaultProviderOptions,
} from "providers";
import Geocoded from "Geocoded";
import { Box } from "types";

interface MapboxRequestParams {
  [param: string]: string | undefined;
  // eslint-disable-next-line camelcase
  readonly access_token: string;
  readonly country?: string;
  readonly language?: string;
  readonly limit?: string;
  readonly bbox?: string;
  readonly types?: string;
}

interface MapboxFeatureContextProperties {
  id: string;
  text: string;
  wikidata?: string;
  // eslint-disable-next-line camelcase
  short_code?: string;
}

interface MapboxFeatureProperties {
  accuracy?: string;
  address?: string;
  category?: string;
  maki?: string;
  wikidata?: string;
  // eslint-disable-next-line camelcase
  short_code?: string;
}

export interface MapboxResult {
  id: string;
  type: "Feature";
  // eslint-disable-next-line camelcase
  place_type: (
    | "country"
    | "region"
    | "postcode"
    | "district"
    | "place"
    | "locality"
    | "neighborhood"
    | "address"
    | "poi"
  )[];
  relevance: number;
  address?: string;
  properties: MapboxFeatureProperties;
  text: string;
  // eslint-disable-next-line camelcase
  place_name: string;
  // eslint-disable-next-line camelcase
  matching_text?: string;
  // eslint-disable-next-line camelcase
  matching_place_name?: string;
  language?: string;
  bbox?: Box;
  center: [number, number];
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
  context?: MapboxFeatureContextProperties[];
  // eslint-disable-next-line camelcase
  routable_points?: {
    points?: {
      coordinates: [number, number];
    }[];
  };
}

export enum MAPBOX_GEOCODING_MODES {
  GEOCODING_MODE_PLACES = "mapbox.places",
  GEOCODING_MODE_PLACES_PERMANENT = "mapbox.places-permanent",
}

export interface MapboxProviderOptionsInterface
  extends ProviderOptionsInterface {
  readonly apiKey: string;
  readonly geocodingMode?: MAPBOX_GEOCODING_MODES;
  readonly country?: string;
}

export const defaultMapboxProviderOptions = {
  ...defaultProviderOptions,
  apiKey: "",
  geocodingMode: MAPBOX_GEOCODING_MODES.GEOCODING_MODE_PLACES,
};

export default class MapboxProvider implements ProviderInterface {
  private externalLoader: ExternalLoaderInterface;

  private options: MapboxProviderOptionsInterface;

  public constructor(
    _externalLoader: ExternalLoaderInterface,
    options: MapboxProviderOptionsInterface = defaultMapboxProviderOptions
  ) {
    this.externalLoader = _externalLoader;
    this.options = { ...defaultMapboxProviderOptions, ...options };
    if (!this.options.apiKey) {
      throw new Error(
        'An API key is required for the Mapbox provider. Please add it in the "apiKey" option.'
      );
    }
  }

  public geocode(
    query: string | MapboxGeocodeQuery | MapboxGeocodeQueryObject,
    callback: GeocodedResultsCallback
  ): void {
    const geocodeQuery = ProviderHelpers.getGeocodeQueryFromParameter(
      query,
      MapboxGeocodeQuery
    );

    this.externalLoader.setOptions({
      protocol: this.options.useSsl ? "https" : "http",
      host: "api.mapbox.com",
      pathname: `geocoding/v5/${
        this.options.geocodingMode
      }/${geocodeQuery.getText()}.json`,
    });

    const params: MapboxRequestParams = {
      access_token: this.options.apiKey || "",
      country: this.options.country,
      language: geocodeQuery.getLocale(),
      limit: geocodeQuery.getLimit().toString(),
      bbox: geocodeQuery.getBounds()
        ? `${geocodeQuery.getBounds()?.west},${
            geocodeQuery.getBounds()?.south
          },${geocodeQuery.getBounds()?.east},${
            geocodeQuery.getBounds()?.north
          }`
        : undefined,
      types: (<MapboxGeocodeQuery>geocodeQuery).getLocationTypes()
        ? (<MapboxGeocodeQuery>geocodeQuery).getLocationTypes()?.join(",")
        : undefined,
    };

    this.executeRequest(params, callback);
  }

  public geodecode(
    latitudeOrQuery:
      | number
      | string
      | MapboxReverseQuery
      | MapboxReverseQueryObject,
    longitudeOrCallback: number | string | GeocodedResultsCallback,
    callback?: GeocodedResultsCallback
  ): void {
    const reverseQuery = ProviderHelpers.getReverseQueryFromParameters(
      latitudeOrQuery,
      longitudeOrCallback,
      MapboxReverseQuery
    );
    const reverseCallback = ProviderHelpers.getCallbackFromParameters(
      longitudeOrCallback,
      callback
    );

    this.externalLoader.setOptions({
      protocol: this.options.useSsl ? "https" : "http",
      host: "api.mapbox.com",
      pathname: `geocoding/v5/${this.options.geocodingMode}/${
        reverseQuery.getCoordinates().longitude
      },${reverseQuery.getCoordinates().latitude}.json`,
    });

    const params: MapboxRequestParams = {
      access_token: this.options.apiKey || "",
      country: this.options.country,
      language: reverseQuery.getLocale(),
      limit: reverseQuery.getLimit().toString(),
      types: (<MapboxReverseQuery>reverseQuery).getLocationTypes()
        ? (<MapboxReverseQuery>reverseQuery).getLocationTypes()?.join(",")
        : "address",
    };

    this.executeRequest(params, reverseCallback);
  }

  public executeRequest(
    params: ExternalLoaderParams,
    callback: GeocodedResultsCallback
  ): void {
    this.externalLoader.executeRequest(params, (data) => {
      callback(
        data.features.map((result: MapboxResult) =>
          MapboxProvider.mapToGeocoded(result)
        )
      );
    });
  }

  public static mapToGeocoded(result: MapboxResult): Geocoded {
    const latitude = result.geometry.coordinates[1];
    const longitude = result.geometry.coordinates[0];
    const formattedAddress = result.place_name;
    const streetNumber = result.address;
    const streetName = result.text;
    let locality;
    let postalCode;
    let region;
    let country;
    let countryCode;

    (result.context || []).forEach((feature) => {
      const type = feature.id.split(".")[0];
      switch (type) {
        case "locality":
        case "place":
          locality = feature.text;
          break;
        case "postcode":
          postalCode = feature.text;
          break;
        case "region":
          region = feature.text;
          break;
        case "country":
          country = feature.text;
          countryCode = feature.short_code;
          break;
        default:
      }
    });

    let geocoded = Geocoded.create({
      latitude,
      longitude,
      formattedAddress,
      streetNumber,
      streetName,
      locality,
      postalCode,
      region,
      country,
      countryCode,
    });
    if (result.bbox) {
      geocoded = geocoded.withBounds(
        result.bbox[1],
        result.bbox[0],
        result.bbox[3],
        result.bbox[2]
      );
    }

    return geocoded;
  }
}
