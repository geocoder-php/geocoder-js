import {
  BingProvider,
  ChainProvider,
  ChainProviderOptionsInterface,
  GeoPluginProvider,
  GoogleMapsProvider,
  GoogleMapsProviderOptionsInterface,
  MapboxProvider,
  MapboxProviderOptionsInterface,
  MapquestProvider,
  NominatimProvider,
  NominatimProviderOptionsInterface,
  OpenCageProvider,
  OpenCageProviderOptionsInterface,
  YandexProvider,
  YandexProviderOptionsInterface,
  ProviderOptionsInterface,
  defaultChainProviderOptions,
  defaultMapboxProviderOptions,
  defaultNominatimProviderOptions,
  defaultOpenCageProviderOptions,
  defaultProviderOptions,
} from "provider";
import ExternalLoader from "ExternalLoader";

interface ProviderOptionInterface {
  provider:
    | "bing"
    | "chain"
    | "geoplugin"
    | "google"
    | "googlemaps"
    | "mapbox"
    | "mapquest"
    | "nominatim"
    | "opencage"
    | "openstreetmap"
    | "yandex";
}

interface ProviderFactoryOptions
  extends ProviderOptionsInterface,
    ProviderOptionInterface {}

interface ChainGeocoderProviderFactoryOptions
  extends ProviderOptionInterface,
    ChainProviderOptionsInterface {
  provider: "chain";
}

interface GeoPluginGeocoderProviderFactoryOptions
  extends ProviderOptionInterface {
  provider: "geoplugin";
}

interface GoogleMapsGeocoderProviderFactoryOptions
  extends ProviderOptionInterface,
    GoogleMapsProviderOptionsInterface {
  provider: "google" | "googlemaps";
}

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

interface OpenCageGeocoderProviderFactoryOptions
  extends ProviderOptionInterface,
    OpenCageProviderOptionsInterface {
  provider: "opencage";
}

interface YandexGeocoderProviderFactoryOptions
  extends ProviderOptionInterface,
    YandexProviderOptionsInterface {
  provider: "yandex";
}

export type GeocoderProviderFactoryOptions =
  | ProviderFactoryOptions
  | ChainGeocoderProviderFactoryOptions
  | GeoPluginGeocoderProviderFactoryOptions
  | GoogleMapsGeocoderProviderFactoryOptions
  | MapboxGeocoderProviderFactoryOptions
  | NominatimGeocoderProviderFactoryOptions
  | OpenCageGeocoderProviderFactoryOptions
  | YandexGeocoderProviderFactoryOptions;

export type GeocoderProvider =
  | BingProvider
  | ChainProvider
  | GeoPluginProvider
  | GoogleMapsProvider
  | MapboxProvider
  | MapquestProvider
  | NominatimProvider
  | OpenCageProvider
  | YandexProvider;

export type GeocoderProviderByOptionsType<
  O
> = O extends ChainGeocoderProviderFactoryOptions
  ? ChainProvider
  : O extends GeoPluginGeocoderProviderFactoryOptions
  ? GeoPluginProvider
  : O extends GoogleMapsGeocoderProviderFactoryOptions
  ? GoogleMapsProvider
  : O extends MapboxGeocoderProviderFactoryOptions
  ? MapboxProvider
  : O extends NominatimGeocoderProviderFactoryOptions
  ? NominatimProvider
  : O extends OpenCageGeocoderProviderFactoryOptions
  ? OpenCageProvider
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

    const externalLoader = new ExternalLoader();

    const { provider, ...providerOptions } = createProviderOptions;
    switch (provider) {
      case "bing":
        return <GeocoderProviderByOptionsType<O>>(
          new BingProvider(externalLoader, providerOptions)
        );
      case "chain":
        return <GeocoderProviderByOptionsType<O>>new ChainProvider({
          ...defaultChainProviderOptions,
          ...providerOptions,
        });
      case "geoplugin":
        return <GeocoderProviderByOptionsType<O>>(
          new GeoPluginProvider(externalLoader, providerOptions)
        );
      case "google":
      case "googlemaps":
        return <GeocoderProviderByOptionsType<O>>(
          new GoogleMapsProvider(externalLoader, providerOptions)
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
      case "opencage":
        return <GeocoderProviderByOptionsType<O>>(
          new OpenCageProvider(externalLoader, {
            ...defaultOpenCageProviderOptions,
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
