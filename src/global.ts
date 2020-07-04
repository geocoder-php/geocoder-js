import UniversalGeocoder from "UniversalGeocoder";

interface Container {
  UniversalGeocoder: typeof UniversalGeocoder;
}

declare global {
  interface Window {
    UniversalGeocoder: typeof UniversalGeocoder;
  }
}

const container: Window | Container =
  typeof window === "object" ? window : ({} as Container);

container.UniversalGeocoder = UniversalGeocoder;
