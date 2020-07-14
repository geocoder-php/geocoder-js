import {
  ExternalLoaderHeaders,
  ExternalLoaderInterface,
  ExternalLoaderParams,
} from "ExternalURILoader";
import {
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
} from "providers";
import AdminLevel from "AdminLevel";

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
  readonly JSONPCallback?: string;
}

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
  readonly host: string;
  readonly userAgent?: string;
  readonly referer?: string;
}

export const defaultNominatimProviderOptions = {
  ...defaultProviderOptions,
  host: "nominatim.openstreetmap.org",
};

export default class NominatimProvider implements ProviderInterface {
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
    callback: GeocodedResultsCallback
  ): void {
    const geocodeQuery = ProviderHelpers.getGeocodeQueryFromParameter(
      query,
      NominatimGeocodeQuery
    );

    this.externalLoader.setOptions({
      protocol: this.options.useSsl ? "https" : "http",
      host: this.options.host,
      pathname: "search",
    });

    const params: NominatimRequestParams = this.getCommonParams(
      {
        q: geocodeQuery.getText(),
        limit: geocodeQuery.getLimit().toString(),
        ...((<NominatimGeocodeQuery>geocodeQuery).getCountryCodes()
          ? {
              countrycodes: (<NominatimGeocodeQuery>geocodeQuery)
                .getCountryCodes()
                ?.join(","),
            }
          : {}),
        ...((<NominatimGeocodeQuery>geocodeQuery).getExcludePlaceIds()
          ? {
              exclude_place_ids: (<NominatimGeocodeQuery>geocodeQuery)
                .getExcludePlaceIds()
                ?.join(","),
            }
          : {}),
        ...((<NominatimGeocodeQuery>geocodeQuery).getViewBox()
          ? {
              viewbox: (<NominatimGeocodeQuery>geocodeQuery)
                .getViewBox()
                ?.join(","),
            }
          : {}),
        ...((<NominatimGeocodeQuery>geocodeQuery).getBounded()
          ? {
              bounded: (<NominatimGeocodeQuery>geocodeQuery)
                .getBounded()
                ?.toString(),
            }
          : {}),
      },
      <NominatimGeocodeQuery>geocodeQuery
    );

    this.executeRequest(params, callback, this.getHeaders());
  }

  public geodecode(
    latitudeOrQuery:
      | number
      | string
      | NominatimReverseQuery
      | NominatimReverseQueryObject,
    longitudeOrCallback: number | string | GeocodedResultsCallback,
    callback?: GeocodedResultsCallback
  ): void {
    const reverseQuery = ProviderHelpers.getReverseQueryFromParameters(
      latitudeOrQuery,
      longitudeOrCallback,
      NominatimReverseQuery
    );
    const reverseCallback = ProviderHelpers.getCallbackFromParameters(
      longitudeOrCallback,
      callback
    );

    this.externalLoader.setOptions({
      protocol: this.options.useSsl ? "https" : "http",
      host: this.options.host,
      pathname: "reverse",
    });

    const params: NominatimRequestParams = this.getCommonParams(
      {
        lat: reverseQuery.getCoordinates().latitude.toString(),
        lon: reverseQuery.getCoordinates().longitude.toString(),
        zoom:
          (<NominatimReverseQuery>reverseQuery).getZoom()?.toString() || "18",
      },
      <NominatimReverseQuery>reverseQuery
    );

    this.executeRequest(params, reverseCallback, this.getHeaders());
  }

  private getCommonParams(
    params: Partial<NominatimRequestParams>,
    query: NominatimGeocodeQuery | NominatimReverseQuery
  ): NominatimRequestParams {
    return {
      ...params,
      format: "jsonv2",
      addressdetails: "1",
      JSONPCallback: this.options.useJsonp ? "json_callback" : undefined,
      ...(query.getLocale() ? { "accept-language": query.getLocale() } : {}),
    };
  }

  private getHeaders(): ExternalLoaderHeaders {
    return {
      "User-Agent": this.options.userAgent || "",
      ...(this.options.referer ? { Referer: this.options.referer } : {}),
    };
  }

  public executeRequest(
    params: ExternalLoaderParams,
    callback: GeocodedResultsCallback,
    headers?: ExternalLoaderHeaders
  ): void {
    this.externalLoader.executeRequest(
      params,
      (data) => {
        callback(
          data.length
            ? data.map((result: NominatimResult) =>
                NominatimProvider.mapToGeocoded(result)
              )
            : [NominatimProvider.mapToGeocoded(data)]
        );
      },
      headers
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
