import {
  ExternalLoaderBody,
  ExternalLoaderHeaders,
  ExternalLoaderInterface,
  ExternalLoaderParams,
} from "ExternalLoader";
import {
  ErrorCallback,
  GeocodedResultsCallback,
  MapQuestGeocoded,
  MapQuestGeocodeQuery,
  MapQuestGeocodeQueryObject,
  ProviderHelpers,
  ProviderInterface,
  ProviderOptionsInterface,
  defaultProviderOptions,
} from "provider";
import { ReverseQuery, ReverseQueryObject } from "query";
import AdminLevel, { ADMIN_LEVEL_CODES } from "AdminLevel";
import { ResponseError } from "error";

interface MapQuestRequestParams {
  [param: string]: string | undefined;
  readonly key: string;
  readonly location?: string;
  readonly boundingBox?: string;
  readonly maxResults?: string;
  readonly jsonpCallback?: string;
}

export interface MapQuestCoordinates {
  lat: number;
  lng: number;
}

export interface MapQuestResult {
  latLng: MapQuestCoordinates;
  displayLatLng: MapQuestCoordinates;
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
  type: "s" | "v";
  linkId: string;
  dragPoint: boolean;
  geocodeQuality:
    | "POINT"
    | "ADDRESS"
    | "INTERSECTION"
    | "STREET"
    | "COUNTRY"
    | "STATE"
    | "COUNTY"
    | "CITY"
    | "NEIGHBORHOOD"
    | "ZIP"
    | "ZIP_EXTENDED";
  geocodeQualityCode: string;
  mapUrl: string;
}

export interface MapQuestResponse {
  info: {
    statuscode: 0 | 400 | 403 | 500;
    copyright: {
      text: string;
      imageUrl: string;
      imageAltText: string;
    };
    messages: string[];
  };
  results: {
    providedLocation: {
      location?: string;
      latLng?: MapQuestCoordinates;
    };
    locations: MapQuestResult[];
  }[];
}

export interface MapQuestProviderOptionsInterface
  extends ProviderOptionsInterface {
  readonly apiKey: string;
  readonly method?: "GET" | "POST";
  readonly openDomain?: boolean;
}

export const defaultMapQuestProviderOptions: MapQuestProviderOptionsInterface = {
  ...defaultProviderOptions,
  apiKey: "",
  method: "GET",
  openDomain: false,
};

type MapQuestGeocodedResultsCallback = GeocodedResultsCallback<
  MapQuestGeocoded
>;

export default class MapQuestProvider
  implements ProviderInterface<MapQuestGeocoded> {
  private externalLoader: ExternalLoaderInterface;

  private options: MapQuestProviderOptionsInterface;

  public constructor(
    _externalLoader: ExternalLoaderInterface,
    options: MapQuestProviderOptionsInterface = defaultMapQuestProviderOptions
  ) {
    this.externalLoader = _externalLoader;
    this.options = { ...defaultMapQuestProviderOptions, ...options };
    if (!this.options.apiKey) {
      throw new Error(
        'An API key is required for the MapQuest provider. Please add it in the "apiKey" option.'
      );
    }
    if (this.options.method && !["GET", "POST"].includes(this.options.method)) {
      throw new Error('The "method" option can either be "GET" or "POST".');
    }
  }

  public geocode(
    query: string | MapQuestGeocodeQuery | MapQuestGeocodeQueryObject,
    callback: MapQuestGeocodedResultsCallback,
    errorCallback?: ErrorCallback
  ): void {
    const geocodeQuery = ProviderHelpers.getGeocodeQueryFromParameter(
      query,
      MapQuestGeocodeQuery
    );

    if (geocodeQuery.getIp()) {
      throw new Error(
        "The MapQuest provider does not support IP geolocation, only location geocoding."
      );
    }

    this.externalLoader.setOptions({
      method: this.options.method,
      protocol: this.options.useSsl ? "https" : "http",
      host: this.options.openDomain
        ? "open.mapquestapi.com"
        : "www.mapquestapi.com",
      pathname: "geocoding/v1/address",
    });

    let requestParams: {
      location?: string;
      boundingBox?: string;
      maxResults?: string;
    } = {
      boundingBox: geocodeQuery.getBounds()
        ? `${geocodeQuery.getBounds()?.north},${
            geocodeQuery.getBounds()?.west
          },${geocodeQuery.getBounds()?.south},${
            geocodeQuery.getBounds()?.east
          }`
        : undefined,
      maxResults: geocodeQuery.getLimit().toString(),
    };
    if ((<MapQuestGeocodeQuery>geocodeQuery).getLocation()) {
      requestParams = {
        ...(<MapQuestGeocodeQuery>geocodeQuery).getLocation(),
        ...requestParams,
      };
    } else {
      requestParams = {
        location: geocodeQuery.getText(),
        ...requestParams,
      };
    }

    requestParams = this.options.method === "GET" ? requestParams : {};
    const params: MapQuestRequestParams = this.withCommonParams(requestParams);

    const body =
      this.options.method === "POST"
        ? {
            location: (<MapQuestGeocodeQuery>geocodeQuery).getLocation()
              ? <ExternalLoaderBody>(
                  (<MapQuestGeocodeQuery>geocodeQuery).getLocation()
                )
              : geocodeQuery.getText(),
            options: {
              boundingBox: geocodeQuery.getBounds()
                ? {
                    ul: {
                      lat: geocodeQuery.getBounds()?.north,
                      lng: geocodeQuery.getBounds()?.west,
                    },
                    lr: {
                      lat: geocodeQuery.getBounds()?.south,
                      lng: geocodeQuery.getBounds()?.east,
                    },
                  }
                : undefined,
              maxResults: geocodeQuery.getLimit().toString(),
            },
          }
        : {};

    this.executeRequest(params, callback, {}, body, errorCallback);
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
      method: this.options.method,
      protocol: this.options.useSsl ? "https" : "http",
      host: this.options.openDomain
        ? "open.mapquestapi.com"
        : "www.mapquestapi.com",
      pathname: "geocoding/v1/reverse",
    });

    const requestParams =
      this.options.method === "GET"
        ? {
            location: `${reverseQuery.getCoordinates().latitude},${
              reverseQuery.getCoordinates().longitude
            }`,
          }
        : {};
    const params: MapQuestRequestParams = this.withCommonParams(requestParams);

    const body =
      this.options.method === "POST"
        ? {
            location: {
              latLng: {
                lat: reverseQuery.getCoordinates().latitude,
                lng: reverseQuery.getCoordinates().longitude,
              },
            },
          }
        : {};

    this.executeRequest(
      params,
      reverseCallback,
      {},
      body,
      reverseErrorCallback
    );
  }

  private withCommonParams(
    params: Pick<
      MapQuestRequestParams,
      "location" | "boundingBox" | "maxResults"
    >
  ): MapQuestRequestParams {
    return {
      ...params,
      key: this.options.apiKey || "",
      jsonpCallback: this.options.useJsonp ? "callback" : undefined,
    };
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
      (data: MapQuestResponse) => {
        if (data.info.statuscode !== 0) {
          const errorMessage = `An error has occurred (${
            data.info.statuscode
          }): ${data.info.messages.join(" / ")}`;
          if (errorCallback) {
            errorCallback(new ResponseError(errorMessage, data));
            return;
          }
          setTimeout(() => {
            throw new Error(errorMessage);
          });
          return;
        }
        callback(
          data.results[0].locations.map((result: MapQuestResult) =>
            MapQuestProvider.mapToGeocoded(result, data.info.copyright.text)
          )
        );
      },
      headers,
      body,
      errorCallback
    );
  }

  public static mapToGeocoded(
    result: MapQuestResult,
    attribution?: string
  ): MapQuestGeocoded {
    const latitude = result.latLng.lat;
    const longitude = result.latLng.lng;
    const streetName = result.street;
    const subLocality = result.adminArea6;
    const locality = result.adminArea5;
    const { postalCode } = result;
    const region = result.adminArea4;
    const country = result.adminArea1;
    const countryCode = result.adminArea1;
    const precision = result.geocodeQuality;
    const precisionCode = result.geocodeQualityCode;
    const { mapUrl } = result;

    const geocoded = MapQuestGeocoded.create({
      latitude,
      longitude,
      streetName,
      subLocality,
      locality,
      postalCode,
      region,
      country,
      countryCode,
      attribution,
      precision,
      precisionCode,
      mapUrl,
    });

    if (result.adminArea3) {
      geocoded.addAdminLevel(
        AdminLevel.create({
          level: ADMIN_LEVEL_CODES.STATE_CODE,
          name: result.adminArea3,
          code: result.adminArea3.length === 2 ? result.adminArea3 : undefined,
        })
      );
    }
    if (result.adminArea4) {
      geocoded.addAdminLevel(
        AdminLevel.create({
          level: ADMIN_LEVEL_CODES.COUNTY_CODE,
          name: result.adminArea4,
        })
      );
    }

    return geocoded;
  }
}
