<<<<<<< HEAD:types/GeocoderJS.d.ts
import { GeocoderProviderFactoryOptions } from "GeocoderProviderFactory";
import { ProviderInterface } from "providers";
export default class GeocoderJS {
=======
import { GeocoderProviderByOptionsType, GeocoderProviderFactoryOptions } from "./GeocoderProviderFactory";
export default class UniversalGeocoder {
>>>>>>> main:types/UniversalGeocoder.d.ts
    version: string;
    static createGeocoder<O extends GeocoderProviderFactoryOptions>(options: string | O): GeocoderProviderByOptionsType<O> | undefined;
}
//# sourceMappingURL=GeocoderJS.d.ts.map