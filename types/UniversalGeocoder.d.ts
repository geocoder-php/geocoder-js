import { GeocoderProviderFactoryOptions } from "./GeocoderProviderFactory";
import { ProviderInterface } from "./providers";
export default class UniversalGeocoder {
    version: string;
    static createGeocoder(options: string | GeocoderProviderFactoryOptions): ProviderInterface | undefined;
}
//# sourceMappingURL=UniversalGeocoder.d.ts.map