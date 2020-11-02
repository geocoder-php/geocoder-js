import {
  BingProvider,
  BingProviderOptionsInterface,
  ChainProvider,
  ChainProviderOptionsInterface,
  GeoPluginProvider,
  GoogleMapsProvider,
  GoogleMapsProviderOptionsInterface,
  MapboxProvider,
  MapboxProviderOptionsInterface,
  MapQuestProvider,
  MapQuestProviderOptionsInterface,
  NominatimProvider,
  NominatimProviderOptionsInterface,
  OpenCageProvider,
  OpenCageProviderOptionsInterface,
  YandexProvider,
  YandexProviderOptionsInterface,
  ProviderOptionsInterface,
  defaultBingProviderOptions,
  defaultChainProviderOptions,
  defaultMapboxProviderOptions,
  defaultMapQuestProviderOptions,
  defaultNominatimProviderOptions,
  defaultOpenCageProviderOptions,
  defaultYandexProviderOptions,
  defaultProviderOptions,
} from "provider";
import ExternalLoader from "ExternalLoader";

interface ProviderOptionInterface {
  provider:
    | "bing"
    | "bingmaps"
    | "chain"
    | "geoplugin"
    | "google"
    | "googlemaps"
    | "mapbox"
    | "mapquest"
    | "microsoft"
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

interface BingGeocoderProviderFactoryOptions
  extends ProviderOptionInterface,
    BingProviderOptionsInterface {
  provider: "bing" | "bingmaps" | "microsoft";
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

interface MapQuestGeocoderProviderFactoryOptions
  extends ProviderOptionInterface,
    MapQuestProviderOptionsInterface {
  provider: "mapquest";
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
  | BingGeocoderProviderFactoryOptions
  | GeoPluginGeocoderProviderFactoryOptions
  | GoogleMapsGeocoderProviderFactoryOptions
  | MapboxGeocoderProviderFactoryOptions
  | MapQuestGeocoderProviderFactoryOptions
  | NominatimGeocoderProviderFactoryOptions
  | OpenCageGeocoderProviderFactoryOptions
  | YandexGeocoderProviderFactoryOptions;

export type GeocoderProvider =
  | BingProvider
  | ChainProvider
  | GeoPluginProvider
  | GoogleMapsProvider
  | MapboxProvider
  | MapQuestProvider
  | NominatimProvider
  | OpenCageProvider
  | YandexProvider;

export type GeocoderProviderByOptionsType<
  O
> = O extends ChainGeocoderProviderFactoryOptions
  ? ChainProvider
  : O extends BingGeocoderProviderFactoryOptions
  ? BingProvider
  : O extends GeoPluginGeocoderProviderFactoryOptions
  ? GeoPluginProvider
  : O extends GoogleMapsGeocoderProviderFactoryOptions
  ? GoogleMapsProvider
  : O extends MapboxGeocoderProviderFactoryOptions
  ? MapboxProvider
  : O extends MapQuestGeocoderProviderFactoryOptions
  ? MapQuestProvider
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
      case "bingmaps":
      case "microsoft":
        return <GeocoderProviderByOptionsType<O>>(
          new BingProvider(externalLoader, {
            ...defaultBingProviderOptions,
            ...providerOptions,
          })
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
          new MapQuestProvider(externalLoader, {
            ...defaultMapQuestProviderOptions,
            ...providerOptions,
          })
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
          new YandexProvider(externalLoader, {
            ...defaultYandexProviderOptions,
            ...providerOptions,
          })
        );
      default:
    }

    return undefined;
  }
}
