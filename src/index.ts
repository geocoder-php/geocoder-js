export interface Bounds {
  readonly south: number | string;
  readonly west: number | string;
  readonly north: number | string;
  readonly east: number | string;
}

export interface Coordinates {
  readonly latitude: number | string;
  readonly longitude: number | string;
}

export * from "providers";
export * from "query";
export { default as ExternalURILoader } from "ExternalURILoader";
export * from "ExternalURILoader";
export { default as Geocoded } from "Geocoded";
export * from "Geocoded";
export { default as GeocoderProviderFactory } from "GeocoderProviderFactory";
export * from "GeocoderProviderFactory";
export { default as GeoJSONDumper } from "GeoJSONDumper";
export * from "GeoJSONDumper";
export { default } from "UniversalGeocoder";
