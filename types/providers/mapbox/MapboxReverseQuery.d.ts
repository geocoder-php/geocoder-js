import { ReverseQuery, ReverseQueryObject } from "../../query";
export interface MapboxReverseQueryObject extends ReverseQueryObject {
    readonly locationTypes?: string[];
}
export default class MapboxReverseQuery extends ReverseQuery {
    private readonly locationTypes?;
    protected constructor({ locationTypes, ...reverseQueryObject }: MapboxReverseQueryObject);
    static create(object: MapboxReverseQueryObject): MapboxReverseQuery;
    toObject(): MapboxReverseQueryObject;
    withLocationTypes(locationTypes: string[]): MapboxReverseQuery;
    getLocationTypes(): undefined | string[];
}
//# sourceMappingURL=MapboxReverseQuery.d.ts.map