import {
  BingProvider,
  GoogleAPIProvider,
  MapboxProvider,
  MapboxProviderOptionsInterface,
  MapquestProvider,
  NominatimProvider,
  NominatimProviderOptionsInterface,
  YandexProvider,
  YandexProviderOptionsInterface,
  ProviderOptionsInterface,
  defaultMapboxProviderOptions,
  defaultNominatimProviderOptions,
  defaultProviderOptions,
} from "providers";
import ExternalURILoader from "ExternalURILoader";

interface ProviderOptionInterface {
  provider:
    | "bing"
    | "google"
    | "mapbox"
    | "mapquest"
    | "nominatim"
    | "openstreetmap"
    | "yandex";
}

interface ProviderFactoryOptions
  extends ProviderOptionsInterface,
    ProviderOptionInterface {}

interface MapboxGeocoderProviderFactoryOptions
  extends ProviderOptionInterface,
    MapboxProviderOptionsInterface {
  provider: "mapbox";
}

interface NominatimGeocoderProviderFactoryOptions
  extends ProviderOptionInterface,
    NominatimProviderOptionsInterface {
  provider: "nominatim" | "openstreetmap";
}

interface YandexGeocoderProviderFactoryOptions
  extends ProviderOptionInterface,
    YandexProviderOptionsInterface {
  provider: "yandex";
}

export type GeocoderProviderFactoryOptions =
  | ProviderFactoryOptions
  | MapboxGeocoderProviderFactoryOptions
  | NominatimGeocoderProviderFactoryOptions
  | YandexGeocoderProviderFactoryOptions;

export type GeocoderProvider =
  | BingProvider
  | GoogleAPIProvider
  | MapboxProvider
  | MapquestProvider
  | NominatimProvider
  | YandexProvider;

export type GeocoderProviderByOptionsType<
  O
> = O extends MapboxGeocoderProviderFactoryOptions
  ? MapboxProvider
  : O extends NominatimGeocoderProviderFactoryOptions
  ? NominatimProvider
  : O extends YandexGeocoderProviderFactoryOptions
  ? YandexProvider
  : GeocoderProvider;

export default class ProviderFactory {
  /**
   * Creates Geocoder Provider instances.
   * @param options
   *   Either a string representing the registered provider, or an object with the
   *   following settings for instigating providers:
   *     - provider: A string representing the registered provider.
   * @return
   *   An object compatible with ProviderInterface, or undefined if there's not a
   *   registered provider.
   */
  public static createProvider<O extends GeocoderProviderFactoryOptions>(
    options: string | O
  ): GeocoderProviderByOptionsType<O> | undefined {
    const createProviderOptions = {
      ...defaultProviderOptions,
      ...(typeof options === "string" ? { provider: options } : options),
    };

    const externalLoader = new ExternalURILoader();

    const { provider, ...providerOptions } = createProviderOptions;
    switch (provider) {
      case "bing":
        return <GeocoderProviderByOptionsType<O>>(
          new BingProvider(externalLoader, providerOptions)
        );
      case "google":
        return <GeocoderProviderByOptionsType<O>>(
          new GoogleAPIProvider(externalLoader, providerOptions)
        );
      case "mapbox":
        return <GeocoderProviderByOptionsType<O>>(
          new MapboxProvider(externalLoader, {
            ...defaultMapboxProviderOptions,
            ...providerOptions,
          })
        );
      case "mapquest":
        return <GeocoderProviderByOptionsType<O>>(
          new MapquestProvider(externalLoader, providerOptions)
        );
      case "openstreetmap":
      case "nominatim":
        return <GeocoderProviderByOptionsType<O>>(
          new NominatimProvider(externalLoader, {
            ...defaultNominatimProviderOptions,
            ...providerOptions,
          })
        );
      case "yandex":
        return <GeocoderProviderByOptionsType<O>>(
          new YandexProvider(externalLoader, providerOptions)
        );
      default:
    }

    return undefined;
  }
}
