import Geocoded from "Geocoded";
export interface GeoJson {
    type: "Feature";
    properties: Record<string, unknown>;
    geometry: {
        type: "Point";
        coordinates: [number | undefined, number | undefined];
    };
}
export default class GeoJsonDumper {
    private baseGeoJson;
    dump(geocoded: Geocoded): GeoJson;
}
//# sourceMappingURL=GeoJSONDumper.d.ts.map