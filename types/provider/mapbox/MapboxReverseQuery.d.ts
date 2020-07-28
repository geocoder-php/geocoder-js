import { ReverseQuery, ReverseQueryObject } from "../../query";
declare type ReverseMode = "distance" | "score";
export interface MapboxReverseQueryObject extends ReverseQueryObject {
    readonly countryCodes?: string[];
    readonly reverseMode?: ReverseMode;
    readonly locationTypes?: string[];
}
export default class MapboxReverseQuery extends ReverseQuery {
    private readonly countryCodes?;
    private readonly reverseMode?;
    private readonly locationTypes?;
    protected constructor({ countryCodes, reverseMode, locationTypes, ...reverseQueryObject }: MapboxReverseQueryObject);
    static create(object: MapboxReverseQueryObject): MapboxReverseQuery;
    toObject(): MapboxReverseQueryObject;
    withCountryCodes(countryCodes: string[]): MapboxReverseQuery;
    getCountryCodes(): undefined | string[];
    withReverseMode(reverseMode: ReverseMode): MapboxReverseQuery;
    getReverseMode(): undefined | ReverseMode;
    withLocationTypes(locationTypes: string[]): MapboxReverseQuery;
    getLocationTypes(): undefined | string[];
}
export {};
//# sourceMappingURL=MapboxReverseQuery.d.ts.map