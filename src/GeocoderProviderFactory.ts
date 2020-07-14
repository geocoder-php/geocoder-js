import {
  BingProvider,
  GoogleAPIProvider,
  MapboxProvider,
  MapquestProvider,
  OpenStreetMapProvider,
  YandexProvider,
  ProviderInterface,
  ProviderOptionsInterface,
  defaultMapboxProviderOptions,
  defaultOpenStreetMapProviderOptions,
  defaultProviderOptions,
} from "providers";
import ExternalURILoader from "ExternalURILoader";

export interface GeocoderProviderFactoryOptions
  extends ProviderOptionsInterface {
  provider:
    | "bing"
    | "google"
    | "mapbox"
    | "mapquest"
    | "nominatim"
    | "openstreetmap"
    | "yandex";
}

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
  public static createProvider(
    options: string | GeocoderProviderFactoryOptions
  ): ProviderInterface | undefined {
    const createProviderOptions = {
      ...defaultProviderOptions,
      ...(typeof options === "string" ? { provider: options } : options),
    };

    const externalLoader = new ExternalURILoader();

    const { provider, ...providerOptions } = createProviderOptions;
    switch (provider) {
      case "bing":
        return new BingProvider(externalLoader, providerOptions);
      case "google":
        return new GoogleAPIProvider(externalLoader, providerOptions);
      case "mapbox":
        return new MapboxProvider(externalLoader, {
          ...defaultMapboxProviderOptions,
          ...providerOptions,
        });
      case "mapquest":
        return new MapquestProvider(externalLoader, providerOptions);
      case "openstreetmap":
      case "nominatim":
        return new OpenStreetMapProvider(externalLoader, {
          ...defaultOpenStreetMapProviderOptions,
          ...providerOptions,
        });
      case "yandex":
        return new YandexProvider(externalLoader, providerOptions);
      default:
    }

    return undefined;
  }
}
