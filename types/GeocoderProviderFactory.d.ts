import { ProviderInterface, ProviderOptionsInterface } from "./providers";
export interface GeocoderProviderFactoryOptions extends ProviderOptionsInterface {
    provider: "bing" | "google" | "mapbox" | "mapquest" | "nominatim" | "openstreetmap" | "yandex";
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
    static createProvider(options: string | GeocoderProviderFactoryOptions): ProviderInterface | undefined;
}
//# sourceMappingURL=GeocoderProviderFactory.d.ts.map