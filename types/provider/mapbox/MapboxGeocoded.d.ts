import Geocoded, { GeocodedObject } from "../../Geocoded";
export interface MapboxGeocodedObject extends GeocodedObject {
    readonly resultType?: string[];
}
export default class MapboxGeocoded extends Geocoded {
    private readonly resultType?;
    protected constructor({ resultType, ...geocodedObject }: MapboxGeocodedObject);
    static create(object: MapboxGeocodedObject): MapboxGeocoded;
    toObject(): MapboxGeocodedObject;
    withResultType(resultType: string[]): MapboxGeocoded;
    getResultType(): undefined | string[];
}
//# sourceMappingURL=MapboxGeocoded.d.ts.map