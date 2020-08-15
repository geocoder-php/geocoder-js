import {
  ExternalLoaderBody,
  ExternalLoaderHeaders,
  ExternalLoaderInterface,
  ExternalLoaderParams,
} from "ExternalLoader";
import {
  ErrorCallback,
  GeocodedResultsCallback,
  MapboxGeocoded,
  MapboxGeocodeQuery,
  MapboxGeocodeQueryObject,
  MapboxReverseQuery,
  MapboxReverseQueryObject,
  ProviderHelpers,
  ProviderInterface,
  ProviderOptionsInterface,
  defaultProviderOptions,
} from "provider";
import { Box } from "types";
import AdminLevel from "AdminLevel";

interface MapboxRequestParams {
  [param: string]: string | undefined;
  // eslint-disable-next-line camelcase
  readonly access_token: string;
  readonly country?: string;
  readonly language?: string;
  readonly limit?: string;
  readonly bbox?: string;
  readonly proximity?: string;
  readonly reverseMode?: "distance" | "score";
  readonly types?: string;
}

export interface MapboxResponse {
  type: "FeatureCollection";
  query: string[];
  features: MapboxResult[];
  attribution: string;
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
  readonly countryCodes?: string[];
}

export const defaultMapboxProviderOptions = {
  ...defaultProviderOptions,
  apiKey: "",
  geocodingMode: MAPBOX_GEOCODING_MODES.GEOCODING_MODE_PLACES,
};

type MapboxGeocodedResultsCallback = GeocodedResultsCallback<MapboxGeocoded>;

export default class MapboxProvider
  implements ProviderInterface<MapboxGeocoded> {
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
    callback: MapboxGeocodedResultsCallback,
    errorCallback?: ErrorCallback
  ): void {
    const geocodeQuery = ProviderHelpers.getGeocodeQueryFromParameter(
      query,
      MapboxGeocodeQuery
    );

    if (geocodeQuery.getIp()) {
      throw new Error(
        "The Mapbox provider does not support IP geolocation, only location geocoding."
      );
    }

    this.externalLoader.setOptions({
      protocol: this.options.useSsl ? "https" : "http",
      host: "api.mapbox.com",
      pathname: `geocoding/v5/${
        this.options.geocodingMode
      }/${geocodeQuery.getText()}.json`,
    });

    const params: MapboxRequestParams = this.withCommonParams(
      {
        bbox: geocodeQuery.getBounds()
          ? `${geocodeQuery.getBounds()?.west},${
              geocodeQuery.getBounds()?.south
            },${geocodeQuery.getBounds()?.east},${
              geocodeQuery.getBounds()?.north
            }`
          : undefined,
        proximity: (<MapboxGeocodeQuery>geocodeQuery).getProximity()
          ? `${(<MapboxGeocodeQuery>geocodeQuery).getProximity()?.longitude},${
              (<MapboxGeocodeQuery>geocodeQuery).getProximity()?.latitude
            }`
          : undefined,
        types: (<MapboxGeocodeQuery>geocodeQuery).getLocationTypes()
          ? (<MapboxGeocodeQuery>geocodeQuery).getLocationTypes()?.join(",")
          : undefined,
      },
      <MapboxGeocodeQuery>geocodeQuery
    );

    this.executeRequest(params, callback, {}, {}, errorCallback);
  }

  public geodecode(
    latitudeOrQuery:
      | number
      | string
      | MapboxReverseQuery
      | MapboxReverseQueryObject,
    longitudeOrCallback: number | string | MapboxGeocodedResultsCallback,
    callbackOrErrorCallback?: MapboxGeocodedResultsCallback | ErrorCallback,
    errorCallback?: ErrorCallback
  ): void {
    const reverseQuery = ProviderHelpers.getReverseQueryFromParameters(
      latitudeOrQuery,
      longitudeOrCallback,
      MapboxReverseQuery
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
      host: "api.mapbox.com",
      pathname: `geocoding/v5/${this.options.geocodingMode}/${
        reverseQuery.getCoordinates().longitude
      },${reverseQuery.getCoordinates().latitude}.json`,
    });

    const params: MapboxRequestParams = this.withCommonParams(
      {
        reverseMode: (<MapboxReverseQuery>reverseQuery).getReverseMode()
          ? (<MapboxReverseQuery>reverseQuery).getReverseMode()
          : undefined,
        types: (<MapboxReverseQuery>reverseQuery).getLocationTypes()
          ? (<MapboxReverseQuery>reverseQuery).getLocationTypes()?.join(",")
          : "address",
      },
      <MapboxReverseQuery>reverseQuery
    );

    this.executeRequest(params, reverseCallback, {}, {}, reverseErrorCallback);
  }

  private withCommonParams(
    params: Pick<
      MapboxRequestParams,
      "bbox" | "proximity" | "reverseMode" | "types"
    >,
    query: MapboxGeocodeQuery | MapboxReverseQuery
  ): MapboxRequestParams {
    return {
      ...params,
      access_token: this.options.apiKey || "",
      country: query.getCountryCodes()
        ? query.getCountryCodes()?.join(",")
        : this.options.countryCodes?.join(","),
      language: query.getLocale(),
      limit: query.getLimit().toString(),
    };
  }

  public executeRequest(
    params: ExternalLoaderParams,
    callback: MapboxGeocodedResultsCallback,
    headers?: ExternalLoaderHeaders,
    body?: ExternalLoaderBody,
    errorCallback?: ErrorCallback
  ): void {
    this.externalLoader.executeRequest(
      params,
      (data: MapboxResponse) => {
        callback(
          data.features.map((result: MapboxResult) =>
            MapboxProvider.mapToGeocoded(result)
          )
        );
      },
      headers,
      body,
      errorCallback
    );
  }

  public static mapToGeocoded(result: MapboxResult): MapboxGeocoded {
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
    const adminLevels: AdminLevel[] = [];
    const resultType = result.place_type;

    let adminLevelCode: undefined | string;
    (result.context || []).forEach((feature) => {
      const type = feature.id.split(".")[0];
      switch (type) {
        case "locality":
          locality = feature.text;
          break;
        case "place":
          locality = feature.text;
          adminLevels.push(
            AdminLevel.create({
              level: 2,
              name: locality,
            })
          );
          break;
        case "postcode":
          postalCode = feature.text;
          break;
        case "region":
          region = feature.text;
          adminLevelCode = undefined;
          if (feature.short_code && feature.short_code.match(/[A-z]{2}-/)) {
            adminLevelCode = feature.short_code.replace(/[A-z]{2}-/, "");
          }
          adminLevels.push(
            AdminLevel.create({
              level: 1,
              name: region,
              code: adminLevelCode,
            })
          );
          break;
        case "country":
          country = feature.text;
          countryCode = feature.short_code;
          break;
        default:
      }
    });

    let geocoded = MapboxGeocoded.create({
      latitude,
      longitude,
      formattedAddress,
      streetNumber,
      streetName,
      locality,
      postalCode,
      region,
      adminLevels,
      country,
      countryCode,
      resultType,
    });
    if (result.bbox) {
      geocoded = <MapboxGeocoded>(
        geocoded.withBounds(
          result.bbox[1],
          result.bbox[0],
          result.bbox[3],
          result.bbox[2]
        )
      );
    }

    return geocoded;
  }
}
