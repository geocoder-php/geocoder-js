import { GeocodeQuery, GeocodeQueryObject } from "../../query";
import { Coordinates } from "../../index";
export interface OpenCageGeocodeQueryObject extends GeocodeQueryObject {
    readonly countryCodes?: string[];
    readonly proximity?: Coordinates;
    readonly minConfidence?: number;
    readonly noRecord?: boolean;
}
export default class OpenCageGeocodeQuery extends GeocodeQuery {
    private readonly countryCodes?;
    private readonly proximity?;
    private readonly minConfidence?;
    private readonly noRecord?;
    protected constructor({ countryCodes, proximity, minConfidence, noRecord, ...geocodeQueryObject }: OpenCageGeocodeQueryObject);
    static create(object: OpenCageGeocodeQueryObject): OpenCageGeocodeQuery;
    toObject(): OpenCageGeocodeQueryObject;
    withCountryCodes(countryCodes: string[]): OpenCageGeocodeQuery;
    getCountryCodes(): undefined | string[];
    withProximity(proximity: Coordinates): OpenCageGeocodeQuery;
    getProximity(): undefined | Coordinates;
    withMinConfidence(minConfidence: number): OpenCageGeocodeQuery;
    getMinConfidence(): undefined | number;
    withNoRecord(noRecord: boolean): OpenCageGeocodeQuery;
    getNoRecord(): undefined | boolean;
}
//# sourceMappingURL=OpenCageGeocodeQuery.d.ts.map