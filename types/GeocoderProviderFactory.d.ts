import { BingProvider, GoogleAPIProvider, MapboxProvider, MapboxProviderOptionsInterface, MapquestProvider, NominatimProvider, NominatimProviderOptionsInterface, YandexProvider, YandexProviderOptionsInterface, ProviderOptionsInterface } from "./providers";
interface ProviderOptionInterface {
    provider: "bing" | "google" | "mapbox" | "mapquest" | "nominatim" | "openstreetmap" | "yandex";
}
interface ProviderFactoryOptions extends ProviderOptionsInterface, ProviderOptionInterface {
}
interface MapboxGeocoderProviderFactoryOptions extends ProviderOptionInterface, MapboxProviderOptionsInterface {
    provider: "mapbox";
}
interface NominatimGeocoderProviderFactoryOptions extends ProviderOptionInterface, NominatimProviderOptionsInterface {
    provider: "nominatim" | "openstreetmap";
}
interface YandexGeocoderProviderFactoryOptions extends ProviderOptionInterface, YandexProviderOptionsInterface {
    provider: "yandex";
}
export declare type GeocoderProviderFactoryOptions = ProviderFactoryOptions | MapboxGeocoderProviderFactoryOptions | NominatimGeocoderProviderFactoryOptions | YandexGeocoderProviderFactoryOptions;
export declare type GeocoderProvider = BingProvider | GoogleAPIProvider | MapboxProvider | MapquestProvider | NominatimProvider | YandexProvider;
export declare type GeocoderProviderByOptionsType<O> = O extends MapboxGeocoderProviderFactoryOptions ? MapboxProvider : O extends NominatimGeocoderProviderFactoryOptions ? NominatimProvider : O extends YandexGeocoderProviderFactoryOptions ? YandexProvider : GeocoderProvider;
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
    static createProvider<O extends GeocoderProviderFactoryOptions>(options: string | O): GeocoderProviderByOptionsType<O> | undefined;
}
export {};
//# sourceMappingURL=GeocoderProviderFactory.d.ts.map