import GeocoderJS from "GeocoderJS";

interface Container {
  GeocoderJS: typeof GeocoderJS;
}

declare global {
  interface Window {
    GeocoderJS: typeof GeocoderJS;
  }
}

const container: Window | Container =
  typeof window === "object" ? window : ({} as Container);

container.GeocoderJS = GeocoderJS;
