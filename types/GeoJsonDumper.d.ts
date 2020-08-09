import Geocoded from "./Geocoded";
import AdminLevel, { AdminLevelObject } from "./AdminLevel";
export interface GeoJson {
    readonly type: "Feature";
    readonly properties: {
        readonly [property: string]: string | string[] | number | boolean | AdminLevel[] | AdminLevelObject[] | undefined;
    };
    readonly geometry: {
        readonly type: "Point";
        readonly coordinates: [number | undefined, number | undefined];
    };
    readonly bounds?: {
        readonly south: number;
        readonly west: number;
        readonly north: number;
        readonly east: number;
    };
}
export default class GeoJsonDumper {
    private static baseGeoJson;
    static dump(geocoded: Geocoded): GeoJson;
}
//# sourceMappingURL=GeoJsonDumper.d.ts.map