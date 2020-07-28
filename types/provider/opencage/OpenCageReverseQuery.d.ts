import { ReverseQuery, ReverseQueryObject } from "../../query";
export interface OpenCageReverseQueryObject extends ReverseQueryObject {
    readonly countryCodes?: string[];
    readonly minConfidence?: number;
    readonly noRecord?: boolean;
}
export default class OpenCageReverseQuery extends ReverseQuery {
    private readonly countryCodes?;
    private readonly minConfidence?;
    private readonly noRecord?;
    protected constructor({ countryCodes, minConfidence, noRecord, ...reverseQueryObject }: OpenCageReverseQueryObject);
    static create(object: OpenCageReverseQueryObject): OpenCageReverseQuery;
    toObject(): OpenCageReverseQueryObject;
    withCountryCodes(countryCodes: string[]): OpenCageReverseQuery;
    getCountryCodes(): undefined | string[];
    withMinConfidence(minConfidence: number): OpenCageReverseQuery;
    getMinConfidence(): undefined | number;
    withNoRecord(noRecord: boolean): OpenCageReverseQuery;
    getNoRecord(): undefined | boolean;
}
//# sourceMappingURL=OpenCageReverseQuery.d.ts.map