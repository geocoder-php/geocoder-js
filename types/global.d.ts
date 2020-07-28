<<<<<<< HEAD
import GeocoderJS from "GeocoderJS";
import GeoJsonDumper from "GeoJsonDumper";
=======
import UniversalGeocoder from "./UniversalGeocoder";
import GeoJsonDumper from "./GeoJsonDumper";
>>>>>>> main
declare global {
    interface Window {
        GeocoderJS: typeof GeocoderJS;
        GeoJsonDumper: typeof GeoJsonDumper;
    }
}
//# sourceMappingURL=global.d.ts.map