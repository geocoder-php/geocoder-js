import { GeocoderProviderByOptionsType, GeocoderProviderFactoryOptions } from "./GeocoderProviderFactory";
export default class UniversalGeocoder {
    version: string;
    static createGeocoder<O extends GeocoderProviderFactoryOptions>(options: string | O): GeocoderProviderByOptionsType<O> | undefined;
}
//# sourceMappingURL=UniversalGeocoder.d.ts.map