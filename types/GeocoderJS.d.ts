import { GeocoderProviderByOptionsType, GeocoderProviderFactoryOptions } from "./GeocoderProviderFactory";
export default class GeocoderJS {
    version: string;
    static createGeocoder<O extends GeocoderProviderFactoryOptions>(options: string | O): GeocoderProviderByOptionsType<O> | undefined;
}
//# sourceMappingURL=GeocoderJS.d.ts.map