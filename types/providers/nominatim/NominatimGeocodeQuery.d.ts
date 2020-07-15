import { GeocodeQuery, GeocodeQueryObject } from "../../query";
import { Box } from "../../types";
export interface NominatimGeocodeQueryObject extends GeocodeQueryObject {
    readonly countryCodes?: string[];
    readonly excludePlaceIds?: number[];
    readonly viewBox?: Box;
    readonly bounded?: boolean;
}
export default class NominatimGeocodeQuery extends GeocodeQuery {
    private readonly countryCodes?;
    private readonly excludePlaceIds?;
    private readonly viewBox?;
    private readonly bounded?;
    protected constructor({ countryCodes, excludePlaceIds, viewBox, bounded, ...geocodeQueryObject }: NominatimGeocodeQueryObject);
    static create(object: NominatimGeocodeQueryObject): NominatimGeocodeQuery;
    toObject(): NominatimGeocodeQueryObject;
    withCountryCodes(countryCodes: string[]): NominatimGeocodeQuery;
    getCountryCodes(): undefined | string[];
    withExcludePlaceIds(excludePlaceIds: number[]): NominatimGeocodeQuery;
    getExcludePlaceIds(): undefined | number[];
    withViewBox(viewBox: Box): NominatimGeocodeQuery;
    getViewBox(): undefined | Box;
    withBounded(bounded: boolean): NominatimGeocodeQuery;
    getBounded(): undefined | boolean;
}
//# sourceMappingURL=NominatimGeocodeQuery.d.ts.map