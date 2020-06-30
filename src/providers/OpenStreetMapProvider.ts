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

interface OpenStreetMapRequestParams {
  [param: string]: string | undefined;
  readonly q?: string;
  readonly lat?: string;
  readonly lon?: string;
  readonly format: string;
  readonly addressdetails: string;
  readonly zoom?: string;
  readonly JSONPCallback?: string;
}

export interface OpenStreetMapResult {
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
  class: string;
  type: string;
  importance: number;
  icon: string;
  address: {
    attraction?: string;
    // eslint-disable-next-line camelcase
    house_number?: string;
    road?: string;
    neighbourhood?: string;
    suburb?: string;
    city?: string;
    town?: string;
    village?: string;
    hamlet?: string;
    state?: string;
    postcode?: string;
    country?: string;
    // eslint-disable-next-line camelcase
    country_code?: string;
  };
}

export default class OpenStreetMapProvider implements ProviderInterface {
  private externalLoader: ExternalLoaderInterface;

  private options: ProviderOptionsInterface;

  public constructor(
    _externalLoader: ExternalLoaderInterface,
    options: ProviderOptionsInterface = defaultProviderOptions
  ) {
    this.externalLoader = _externalLoader;
    this.options = { ...defaultProviderOptions, ...options };
  }

  public geocode(
    query: string | GeocodeQuery | GeocodeQueryObject,
    callback: GeocodedResultsCallback
  ): void {
    const geocodeQuery = ProviderHelpers.getGeocodeQueryFromParameter(query);

    this.externalLoader.setOptions({
      protocol: this.options.useSsl ? "https" : "http",
      host: "nominatim.openstreetmap.org",
      pathname: "search",
    });

    const params: OpenStreetMapRequestParams = {
      q: geocodeQuery.getText(),
      format: "json",
      addressdetails: "1",
      JSONPCallback: this.options.useJsonp ? "json_callback" : undefined,
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
      host: "nominatim.openstreetmap.org",
      pathname: "reverse",
    });

    const params: OpenStreetMapRequestParams = {
      lat: reverseQuery.getCoordinates().latitude.toString(),
      lon: reverseQuery.getCoordinates().longitude.toString(),
      format: "json",
      addressdetails: "1",
      zoom: "18",
      JSONPCallback: this.options.useJsonp ? "json_callback" : undefined,
    };

    this.executeRequest(params, reverseCallback);
  }

  public executeRequest(
    params: ExternalLoaderParams,
    callback: GeocodedResultsCallback
  ): void {
    this.externalLoader.executeRequest(params, (data) => {
      callback(
        data.length
          ? data.map((result: OpenStreetMapResult) =>
              OpenStreetMapProvider.mapToGeocoded(result)
            )
          : [OpenStreetMapProvider.mapToGeocoded(data)]
      );
    });
  }

  public static mapToGeocoded(result: OpenStreetMapResult): Geocoded {
    const latitude = parseFloat(result.lat);
    const longitude = parseFloat(result.lon);
    const streetNumber = result.address.house_number;
    const streetName = result.address.road;
    const subLocality = result.address.suburb;
    let locality: string | undefined;
    const postalCode = result.address.postcode
      ? result.address.postcode.split(";")[0]
      : undefined;
    const region = result.address.state;
    const { country } = result.address;
    const countryCode = result.address.country_code;

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

    let geocoded = Geocoded.create({
      latitude,
      longitude,
      streetNumber,
      streetName,
      subLocality,
      locality,
      postalCode,
      region,
      country,
      countryCode,
    });

    geocoded = geocoded.withBounds(
      parseFloat(result.boundingbox[0]),
      parseFloat(result.boundingbox[2]),
      parseFloat(result.boundingbox[1]),
      parseFloat(result.boundingbox[3])
    );

    return geocoded;
  }
}
