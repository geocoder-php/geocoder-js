import GeocoderJS from "GeocoderJS";
import GeoJsonDumper from "GeoJsonDumper";

interface Container {
  GeocoderJS: typeof GeocoderJS;
  GeoJsonDumper: typeof GeoJsonDumper;
}

declare global {
  interface Window {
    GeocoderJS: typeof GeocoderJS;
    GeoJsonDumper: typeof GeoJsonDumper;
  }
}

const container: Window | Container =
  typeof window === "object" ? window : ({} as Container);

container.GeocoderJS = GeocoderJS;
container.GeoJsonDumper = GeoJsonDumper;
