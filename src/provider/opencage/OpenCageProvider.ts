import {
  ExternalLoaderBody,
  ExternalLoaderHeaders,
  ExternalLoaderInterface,
  ExternalLoaderParams,
} from "ExternalLoader";
import {
  ErrorCallback,
  GeocodedResultsCallback,
  OpenCageGeocoded,
  OpenCageGeocodeQuery,
  OpenCageGeocodeQueryObject,
  OpenCageReverseQuery,
  OpenCageReverseQueryObject,
  ProviderHelpers,
  ProviderInterface,
  ProviderOptionsInterface,
  defaultProviderOptions,
} from "provider";
import AdminLevel from "AdminLevel";
import { ResponseError } from "error";

interface OpenCageRequestParams {
  [param: string]: string | undefined;
  readonly key: string;
  readonly q: string;
  readonly countrycode?: string;
  readonly language?: string;
  readonly limit?: string;
  readonly bounds?: string;
  readonly proximity?: string;
  // eslint-disable-next-line camelcase
  readonly min_confidence?: string;
  // eslint-disable-next-line camelcase
  readonly no_record?: string;
  readonly jsonpCallback?: string;
}

interface OpenCageCoordinates {
  lat: number;
  lng: number;
}

interface OpenCageSun {
  apparent: number;
  astronomical: number;
  civil: number;
  nautical: number;
}

export interface OpenCageResponse {
  documentation: string;
  licences: {
    name: string;
    url: string;
  }[];
  rate: {
    limit: number;
    remaining: number;
    reset: number;
  };
  results: OpenCageResult[];
  status: {
    code: 200 | 400 | 401 | 402 | 403 | 404 | 405 | 408 | 410 | 429 | 503;
    message: string;
  };
  // eslint-disable-next-line camelcase
  stay_informed: {
    blog: string;
    twitter: string;
  };
  thanks: string;
  timestamp: {
    // eslint-disable-next-line camelcase
    created_http: string;
    // eslint-disable-next-line camelcase
    created_unix: number;
  };
  // eslint-disable-next-line camelcase
  total_results: number;
}

export interface OpenCageResult {
  annotations: {
    callingcode: number;
    currency: {
      // eslint-disable-next-line camelcase
      alternate_symbols: string[];
      // eslint-disable-next-line camelcase
      decimal_mark: string;
      // eslint-disable-next-line camelcase
      disambiguate_symbol?: string;
      // eslint-disable-next-line camelcase
      html_entity: string;
      // eslint-disable-next-line camelcase
      iso_code: string;
      // eslint-disable-next-line camelcase
      iso_numeric: string;
      name: string;
      // eslint-disable-next-line camelcase
      smallest_denomination: number;
      subunit: string;
      // eslint-disable-next-line camelcase
      subunit_to_unit: number;
      symbol: string;
      // eslint-disable-next-line camelcase
      symbol_first: number;
      // eslint-disable-next-line camelcase
      thousands_separator: string;
    };
    DMS: {
      lat: string;
      lng: string;
    };
    FIPS?: {
      state?: string;
      county?: string;
    };
    flag: string;
    geohash?: string;
    ITM?: {
      easting: string;
      northing: string;
    };
    Maidenhead?: string;
    Mercator: {
      x: number;
      y: number;
    };
    MGRS?: string;
    OSM: {
      // eslint-disable-next-line camelcase
      edit_url?: string;
      // eslint-disable-next-line camelcase
      note_url: string;
      url: string;
    };
    qibla: number;
    roadinfo: {
      // eslint-disable-next-line camelcase
      drive_on: "left" | "right";
      road?: string;
      // eslint-disable-next-line camelcase
      road_type?: string;
      // eslint-disable-next-line camelcase
      road_reference?: string;
      // eslint-disable-next-line camelcase
      road_reference_intl?: string;
      // eslint-disable-next-line camelcase
      speed_in: "km/h" | "mph";
    };
    sun: {
      rise: OpenCageSun;
      set: OpenCageSun;
    };
    timezone: {
      name: string;
      // eslint-disable-next-line camelcase
      now_in_dst: number;
      // eslint-disable-next-line camelcase
      offset_sec: number;
      // eslint-disable-next-line camelcase
      offset_string: string;
      // eslint-disable-next-line camelcase
      short_name: string;
    };
    // eslint-disable-next-line camelcase
    UN_M49: {
      regions: {
        [region: string]: string;
      };
      // eslint-disable-next-line camelcase
      statistical_groupings: ("LDC" | "LEDC" | "LLDC" | "MEDC" | "SIDS")[];
    };
    what3words?: {
      words: string;
    };
    wikidata?: string;
  };
  bounds: {
    northeast: OpenCageCoordinates;
    southwest: OpenCageCoordinates;
  };
  components: {
    "ISO_3166-1_alpha-2"?: string;
    "ISO_3166-1_alpha-3"?: string;
    _category:
      | "agriculture"
      | "building"
      | "castle"
      | "commerce"
      | "construction"
      | "education"
      | "financial"
      | "government"
      | "health"
      | "industrial"
      | "military"
      | "natural/water"
      | "outdoors/recreation"
      | "place"
      | "place_of_worship"
      | "postcode"
      | "road"
      | "social"
      | "transportation"
      | "travel/tourism"
      | "unknown";
    _type: string;
    castle?: string;
    city?: string;
    // eslint-disable-next-line camelcase
    city_district?: string;
    continent?:
      | "Africa"
      | "Antarctica"
      | "Asia"
      | "Europe"
      | "Oceania"
      | "North America"
      | "South America";
    country?: string;
    // eslint-disable-next-line camelcase
    country_code?: string;
    county?: string;
    // eslint-disable-next-line camelcase
    county_code?: string;
    croft?: string;
    district?: string;
    footway?: string;
    hamlet?: string;
    // eslint-disable-next-line camelcase
    house_number?: string;
    houses?: string;
    locality?: string;
    municipality?: string;
    neighbourhood?: string;
    path?: string;
    pedestrian?: string;
    // eslint-disable-next-line camelcase
    political_union?: string;
    postcode?: string;
    quarter?: string;
    residential?: string;
    road?: string;
    // eslint-disable-next-line camelcase
    road_reference?: string;
    // eslint-disable-next-line camelcase
    road_reference_intl?: string;
    // eslint-disable-next-line camelcase
    road_type?: string;
    state?: string;
    // eslint-disable-next-line camelcase
    state_code?: string;
    // eslint-disable-next-line camelcase
    state_district?: string;
    street?: string;
    // eslint-disable-next-line camelcase
    street_name?: string;
    subdivision?: string;
    suburb?: string;
    town?: string;
    village?: string;
  };
  confidence: number;
  formatted: string;
  geometry: OpenCageCoordinates;
}

export interface OpenCageProviderOptionsInterface
  extends ProviderOptionsInterface {
  readonly apiKey: string;
  readonly countryCodes?: string[];
}

export const defaultOpenCageProviderOptions = {
  ...defaultProviderOptions,
  apiKey: "",
};

type OpenCageGeocodedResultsCallback = GeocodedResultsCallback<
  OpenCageGeocoded
>;

export default class OpenCageProvider
  implements ProviderInterface<OpenCageGeocoded> {
  private externalLoader: ExternalLoaderInterface;

  private options: OpenCageProviderOptionsInterface;

  public constructor(
    _externalLoader: ExternalLoaderInterface,
    options: OpenCageProviderOptionsInterface = defaultOpenCageProviderOptions
  ) {
    this.externalLoader = _externalLoader;
    this.options = { ...defaultOpenCageProviderOptions, ...options };
    if (!this.options.apiKey) {
      throw new Error(
        'An API key is required for the OpenCage provider. Please add it in the "apiKey" option.'
      );
    }
  }

  public geocode(
    query: string | OpenCageGeocodeQuery | OpenCageGeocodeQueryObject,
    callback: OpenCageGeocodedResultsCallback,
    errorCallback?: ErrorCallback
  ): void {
    const geocodeQuery = ProviderHelpers.getGeocodeQueryFromParameter(
      query,
      OpenCageGeocodeQuery
    );

    if (geocodeQuery.getIp()) {
      throw new Error(
        "The OpenCage provider does not support IP geolocation, only location geocoding."
      );
    }

    this.externalLoader.setOptions({
      protocol: this.options.useSsl ? "https" : "http",
      host: "api.opencagedata.com",
      pathname: "geocode/v1/json",
    });

    const params: OpenCageRequestParams = this.withCommonParams(
      {
        q: geocodeQuery.getText() || "",
        bounds: geocodeQuery.getBounds()
          ? `${geocodeQuery.getBounds()?.west},${
              geocodeQuery.getBounds()?.south
            },${geocodeQuery.getBounds()?.east},${
              geocodeQuery.getBounds()?.north
            }`
          : undefined,
        proximity: (<OpenCageGeocodeQuery>geocodeQuery).getProximity()
          ? `${(<OpenCageGeocodeQuery>geocodeQuery).getProximity()?.latitude},${
              (<OpenCageGeocodeQuery>geocodeQuery).getProximity()?.longitude
            }`
          : undefined,
      },
      <OpenCageGeocodeQuery>geocodeQuery
    );

    this.executeRequest(params, callback, {}, {}, errorCallback);
  }

  public geodecode(
    latitudeOrQuery:
      | number
      | string
      | OpenCageReverseQuery
      | OpenCageReverseQueryObject,
    longitudeOrCallback: number | string | OpenCageGeocodedResultsCallback,
    callbackOrErrorCallback?: OpenCageGeocodedResultsCallback | ErrorCallback,
    errorCallback?: ErrorCallback
  ): void {
    const reverseQuery = ProviderHelpers.getReverseQueryFromParameters(
      latitudeOrQuery,
      longitudeOrCallback,
      OpenCageReverseQuery
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
      host: "api.opencagedata.com",
      pathname: "geocode/v1/json",
    });

    const params: OpenCageRequestParams = this.withCommonParams(
      {
        q: `${reverseQuery.getCoordinates().latitude},${
          reverseQuery.getCoordinates().longitude
        }`,
      },
      <OpenCageReverseQuery>reverseQuery
    );

    this.executeRequest(params, reverseCallback, {}, {}, reverseErrorCallback);
  }

  private withCommonParams(
    params: Pick<OpenCageRequestParams, "q" | "bounds" | "proximity">,
    query: OpenCageGeocodeQuery | OpenCageReverseQuery
  ): OpenCageRequestParams {
    return {
      ...params,
      key: this.options.apiKey || "",
      countrycode: query.getCountryCodes()
        ? query.getCountryCodes()?.join(",")
        : this.options.countryCodes?.join(","),
      language: query.getLocale(),
      limit: query.getLimit().toString(),
      min_confidence: query.getMinConfidence()?.toString(),
      no_record: query.getNoRecord()?.toString(),
      jsonpCallback: this.options.useJsonp ? "jsonp" : undefined,
    };
  }

  public executeRequest(
    params: ExternalLoaderParams,
    callback: OpenCageGeocodedResultsCallback,
    headers?: ExternalLoaderHeaders,
    body?: ExternalLoaderBody,
    errorCallback?: ErrorCallback
  ): void {
    this.externalLoader.executeRequest(
      params,
      (data: OpenCageResponse) => {
        callback(
          data.results.map((result: OpenCageResult) =>
            OpenCageProvider.mapToGeocoded(result)
          )
        );
      },
      headers,
      body,
      (error) => {
        const response = <Response>error.getResponse();
        response.json().then((data: OpenCageResponse) => {
          if (data.status) {
            let errorMessage: string;
            switch (data.status.code) {
              case 400:
                errorMessage = `Invalid request (400): ${data.status.message}`;
                break;
              case 401:
                errorMessage = `Unable to authenticate (401): ${data.status.message}`;
                break;
              case 402:
                errorMessage = `Quota exceeded (402): ${data.status.message}`;
                break;
              case 403:
                errorMessage = `Forbidden (403): ${data.status.message}`;
                break;
              case 404:
                errorMessage = `Invalid API endpoint (404): ${data.status.message}`;
                break;
              case 405:
                errorMessage = `Method not allowed (405): ${data.status.message}`;
                break;
              case 408:
                errorMessage = `Timeout (408): ${data.status.message}`;
                break;
              case 410:
                errorMessage = `Request too long (410): ${data.status.message}`;
                break;
              case 429:
                errorMessage = `Too many requests (429): ${data.status.message}`;
                break;
              case 503:
                errorMessage = `Internal server error (503): ${data.status.message}`;
                break;
              default:
                errorMessage = `Error (${data.status.code}): ${data.status.message}`;
            }
            if (errorCallback) {
              errorCallback(new ResponseError(errorMessage, data));
              return;
            }
            setTimeout(() => {
              throw new Error(errorMessage);
            });
          }
        });
      }
    );
  }

  public static mapToGeocoded(result: OpenCageResult): OpenCageGeocoded {
    const latitude = result.geometry.lat;
    const longitude = result.geometry.lng;
    const formattedAddress = result.formatted;
    const streetNumber = result.components.house_number;
    const postalCode = result.components.postcode;
    const region = result.components.state;
    const { country } = result.components;
    const countryCode = result.components.country_code;
    const timezone = result.annotations.timezone.name;
    const callingCode = result.annotations.callingcode;
    const { flag } = result.annotations;
    const mgrs = result.annotations.MGRS;
    const maidenhead = result.annotations.Maidenhead;
    const { geohash } = result.annotations;
    const what3words = result.annotations.what3words?.words;

    const streetName =
      result.components.road ||
      result.components.footway ||
      result.components.street ||
      result.components.street_name ||
      result.components.residential ||
      result.components.path ||
      result.components.pedestrian ||
      result.components.road_reference ||
      result.components.road_reference_intl;

    const subLocality =
      result.components.neighbourhood ||
      result.components.suburb ||
      result.components.city_district ||
      result.components.district ||
      result.components.quarter ||
      result.components.houses ||
      result.components.subdivision;

    const locality =
      result.components.city ||
      result.components.town ||
      result.components.municipality ||
      result.components.village ||
      result.components.hamlet ||
      result.components.locality ||
      result.components.croft;

    let geocoded = OpenCageGeocoded.create({
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
      timezone,
      callingCode,
      flag,
      mgrs,
      maidenhead,
      geohash,
      what3words,
    });

    if (result.bounds) {
      geocoded = <OpenCageGeocoded>(
        geocoded.withBounds(
          result.bounds.southwest.lat,
          result.bounds.southwest.lng,
          result.bounds.northeast.lat,
          result.bounds.northeast.lng
        )
      );
    }

    const adminLevels: {
      nameKey: "state" | "county";
      codeKey: "state_code" | "county_code";
    }[] = [
      { nameKey: "state", codeKey: "state_code" },
      { nameKey: "county", codeKey: "county_code" },
    ];
    adminLevels.forEach(({ nameKey, codeKey }, level) => {
      if (result.components[nameKey]) {
        geocoded.addAdminLevel(
          AdminLevel.create({
            level: level + 1,
            name: result.components[nameKey] || "",
            code: result.components[codeKey] || undefined,
          })
        );
      }
    });

    return geocoded;
  }
}
