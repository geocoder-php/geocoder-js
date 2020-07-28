import { GeocodeQuery, GeocodeQueryObject } from "../../query";
export interface MapboxGeocodeQueryObject extends GeocodeQueryObject {
    readonly countryCodes?: string[];
    readonly proximity?: Coordinates;
    readonly locationTypes?: string[];
}
export default class MapboxGeocodeQuery extends GeocodeQuery {
    private readonly countryCodes?;
    private readonly proximity?;
    private readonly locationTypes?;
    protected constructor({ countryCodes, proximity, locationTypes, ...geocodeQueryObject }: MapboxGeocodeQueryObject);
    static create(object: MapboxGeocodeQueryObject): MapboxGeocodeQuery;
    toObject(): MapboxGeocodeQueryObject;
    withCountryCodes(countryCodes: string[]): MapboxGeocodeQuery;
    getCountryCodes(): undefined | string[];
    withProximity(proximity: Coordinates): MapboxGeocodeQuery;
    getProximity(): undefined | Coordinates;
    withLocationTypes(locationTypes: string[]): MapboxGeocodeQuery;
    getLocationTypes(): undefined | string[];
}
//# sourceMappingURL=MapboxGeocodeQuery.d.ts.map