import UniversalGeocoder from "./UniversalGeocoder";
import GeoJsonDumper from "./GeoJsonDumper";
declare global {
    interface Window {
        UniversalGeocoder: typeof UniversalGeocoder;
        GeoJsonDumper: typeof GeoJsonDumper;
    }
}
//# sourceMappingURL=global.d.ts.map