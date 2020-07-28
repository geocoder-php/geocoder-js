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
<<<<<<< HEAD
export * from "providers";
export * from "query";
export { default as AdminLevel } from "AdminLevel";
export * from "AdminLevel";
export { default as ExternalURILoader } from "ExternalURILoader";
export * from "ExternalURILoader";
export { default as Geocoded } from "Geocoded";
export * from "Geocoded";
export { default as GeocoderProviderFactory } from "GeocoderProviderFactory";
export * from "GeocoderProviderFactory";
export { default as GeoJsonDumper } from "GeoJsonDumper";
export * from "GeoJsonDumper";
export { default } from "GeocoderJS";
=======
export * from "./provider";
export * from "./query";
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
>>>>>>> main
//# sourceMappingURL=index.d.ts.map