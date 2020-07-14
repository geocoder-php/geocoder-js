import UniversalGeocoder from "UniversalGeocoder";
import GeoJsonDumper from "GeoJsonDumper";

interface Container {
  UniversalGeocoder: typeof UniversalGeocoder;
  GeoJsonDumper: typeof GeoJsonDumper;
}

declare global {
  interface Window {
    UniversalGeocoder: typeof UniversalGeocoder;
    GeoJsonDumper: typeof GeoJsonDumper;
  }
}

const container: Window | Container =
  typeof window === "object" ? window : ({} as Container);

container.UniversalGeocoder = UniversalGeocoder;
container.GeoJsonDumper = GeoJsonDumper;
