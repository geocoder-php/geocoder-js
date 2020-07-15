import { GeocodeQuery, GeocodeQueryObject } from "../../query";
export interface MapboxGeocodeQueryObject extends GeocodeQueryObject {
    readonly locationTypes?: string[];
}
export default class MapboxGeocodeQuery extends GeocodeQuery {
    private readonly locationTypes?;
    protected constructor({ locationTypes, ...geocodeQueryObject }: MapboxGeocodeQueryObject);
    static create(object: MapboxGeocodeQueryObject): MapboxGeocodeQuery;
    toObject(): MapboxGeocodeQueryObject;
    withLocationTypes(locationTypes: string[]): MapboxGeocodeQuery;
    getLocationTypes(): undefined | string[];
}
//# sourceMappingURL=MapboxGeocodeQuery.d.ts.map