import GeocoderJS from "GeocoderJS";
import GeoJsonDumper from "GeoJsonDumper";
declare global {
    interface Window {
        GeocoderJS: typeof GeocoderJS;
        GeoJsonDumper: typeof GeoJsonDumper;
    }
}
//# sourceMappingURL=global.d.ts.map