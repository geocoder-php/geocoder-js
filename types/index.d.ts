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
export * from "./provider";
export * from "./query";
export * from "./utils";
export { default as AdminLevel } from "./AdminLevel";
export * from "./AdminLevel";
export { default as ExternalLoader } from "./ExternalLoader";
export * from "./ExternalLoader";
export { default as Geocoded } from "./Geocoded";
export * from "./Geocoded";
export { default as GeocoderProviderFactory } from "./GeocoderProviderFactory";
export * from "./GeocoderProviderFactory";
export { default as GeoJsonDumper } from "./GeoJsonDumper";
export * from "./GeoJsonDumper";
export { default } from "./UniversalGeocoder";
//# sourceMappingURL=index.d.ts.map