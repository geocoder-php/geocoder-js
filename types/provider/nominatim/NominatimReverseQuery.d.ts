import { ReverseQuery, ReverseQueryObject } from "../../query";
export interface NominatimReverseQueryObject extends ReverseQueryObject {
    readonly zoom?: number;
}
export default class NominatimReverseQuery extends ReverseQuery {
    private readonly zoom?;
    protected constructor({ zoom, ...reverseQueryObject }: NominatimReverseQueryObject);
    static create(object: NominatimReverseQueryObject): NominatimReverseQuery;
    toObject(): NominatimReverseQueryObject;
    withZoom(zoom: number): NominatimReverseQuery;
    getZoom(): undefined | number;
}
//# sourceMappingURL=NominatimReverseQuery.d.ts.map