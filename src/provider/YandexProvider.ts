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

interface YandexRequestParams {
  [param: string]: string | undefined;
  readonly apikey?: string;
  readonly geocode: string;
  readonly format: string;
  readonly lang?: string;
  readonly toponym?: "house" | "street" | "metro" | "district" | "locality";
  readonly jsonpCallback?: string;
}

interface YandexCollectionResult {
  GeoObject: YandexResult;
}

export interface YandexResult {
  metaDataProperty: {
    GeocoderMetaData: {
      kind: string;
      text: string;
      precision: string;
      AddressDetails: {
        Country: {
          AddressLine: string;
          CountryNameCode: string;
          CountryName: string;
          AdministrativeArea?: {
            AdministrativeAreaName: string;
            SubAdministrativeArea?: {
              SubAdministrativeAreaName: string;
              Locality?: {
                LocalityName: string;
                Thoroughfare?: {
                  ThoroughfareName: string;
                  Premise: {
                    PremiseNumber: string;
                  };
                };
              };
            };
          };
        };
      };
    };
  };
  description: string;
  name: string;
  boundedBy: {
    Envelope: {
      lowerCorner: string;
      upperCorner: string;
    };
  };
  Point: {
    pos: string;
  };
}

interface YandexFlattenedAddressDetails {
  CountryNameCode?: string;
  CountryName?: string;
  AdministrativeAreaName?: string;
  LocalityName?: string;
  DependentLocalityName?: string;
  ThoroughfareName?: string;
  PremiseNumber?: string;
}

export interface YandexProviderOptionsInterface
  extends ProviderOptionsInterface {
  readonly toponym?: "house" | "street" | "metro" | "district" | "locality";
}

type YandexGeocodedResultsCallback = GeocodedResultsCallback<Geocoded>;

export default class YandexProvider implements ProviderInterface<Geocoded> {
  private externalLoader: ExternalLoaderInterface;

  private options: YandexProviderOptionsInterface;

  public constructor(
    _externalLoader: ExternalLoaderInterface,
    options: YandexProviderOptionsInterface = defaultProviderOptions
  ) {
    this.externalLoader = _externalLoader;
    this.options = { ...defaultProviderOptions, ...options };
  }

  public geocode(
    query: string | GeocodeQuery | GeocodeQueryObject,
    callback: YandexGeocodedResultsCallback,
    errorCallback?: ErrorCallback
  ): void {
    const geocodeQuery = ProviderHelpers.getGeocodeQueryFromParameter(query);

    if (geocodeQuery.getIp()) {
      throw new Error(
        "The Yandex provider does not support IP geolocation, only location geocoding."
      );
    }

    this.externalLoader.setOptions({
      protocol: this.options.useSsl ? "https" : "http",
      host: "geocode-maps.yandex.ru",
      pathname: "1.x",
    });

    const params: YandexRequestParams = {
      apikey: this.options.apiKey,
      geocode: geocodeQuery.getText() || "",
      format: "json",
      lang: geocodeQuery.getLocale(),
      jsonpCallback: this.options.useJsonp ? "callback" : undefined,
    };

    this.executeRequest(params, callback, {}, {}, errorCallback);
  }

  public geodecode(
    latitudeOrQuery: number | string | ReverseQuery | ReverseQueryObject,
    longitudeOrCallback: number | string | YandexGeocodedResultsCallback,
    callbackOrErrorCallback?: YandexGeocodedResultsCallback | ErrorCallback,
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
      host: "geocode-maps.yandex.ru",
      pathname: "1.x",
    });

    const params: YandexRequestParams = {
      apikey: this.options.apiKey,
      geocode: `${reverseQuery.getCoordinates().longitude},${
        reverseQuery.getCoordinates().latitude
      }`,
      format: "json",
      lang: reverseQuery.getLocale(),
      toponym: this.options.toponym,
      jsonpCallback: this.options.useJsonp ? "callback" : undefined,
    };

    this.executeRequest(params, reverseCallback, {}, {}, reverseErrorCallback);
  }

  public executeRequest(
    params: ExternalLoaderParams,
    callback: YandexGeocodedResultsCallback,
    headers?: ExternalLoaderHeaders,
    body?: ExternalLoaderBody,
    errorCallback?: ErrorCallback
  ): void {
    this.externalLoader.executeRequest(
      params,
      (data) => {
        callback(
          data.response.GeoObjectCollection.featureMember.map(
            (result: YandexCollectionResult) =>
              YandexProvider.mapToGeocoded(result.GeoObject)
          )
        );
      },
      headers,
      body,
      errorCallback
    );
  }

  public static mapToGeocoded(result: YandexResult): Geocoded {
    const point = result.Point.pos.split(" ");
    const latitude = parseFloat(point[1]);
    const longitude = parseFloat(point[0]);

    const addressDetails: YandexFlattenedAddressDetails = YandexProvider.flattenObject(
      result.metaDataProperty.GeocoderMetaData.AddressDetails
    );

    const streetNumber = addressDetails.PremiseNumber;
    const streetName = addressDetails.ThoroughfareName;
    const subLocality = addressDetails.DependentLocalityName;
    const locality = addressDetails.LocalityName;
    const region = addressDetails.AdministrativeAreaName;
    const country = addressDetails.CountryName;
    const countryCode = addressDetails.CountryNameCode;

    let geocoded = Geocoded.create({
      latitude,
      longitude,
      streetNumber,
      streetName,
      subLocality,
      locality,
      region,
      country,
      countryCode,
    });

    const lowerCorner = result.boundedBy.Envelope.lowerCorner.split(" ");
    const upperCorner = result.boundedBy.Envelope.upperCorner.split(" ");
    geocoded = geocoded.withBounds(
      parseFloat(lowerCorner[1]),
      parseFloat(lowerCorner[0]),
      parseFloat(upperCorner[1]),
      parseFloat(upperCorner[0])
    );

    return geocoded;
  }

  private static flattenObject<
    O extends { [key: string]: O[keyof O] | S },
    S extends string | string[]
  >(object: O) {
    const flattened: { [key: string]: S } = {};

    const step = (nestedObject: O | O[keyof O]): void => {
      Object.keys(<O>nestedObject).forEach((key) => {
        const value = (<O>nestedObject)[key];
        const isArray = Array.isArray(value);
        const type = Object.prototype.toString.call(value);
        const isObject =
          type === "[object Object]" || type === "[object Array]";

        if (
          !isArray &&
          isObject &&
          Object.keys(<Record<string, unknown>>value).length
        ) {
          step(<O[keyof O]>value);
          return;
        }

        flattened[key] = <S>value;
      });
    };

    step(object);

    return flattened;
  }
}
