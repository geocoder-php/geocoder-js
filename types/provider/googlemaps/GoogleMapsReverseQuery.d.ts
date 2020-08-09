import { ReverseQuery, ReverseQueryObject } from "../../query";
export interface GoogleMapsReverseQueryObject extends ReverseQueryObject {
    readonly resultTypes?: string[];
    readonly locationTypes?: string[];
    readonly channel?: string;
}
export default class GoogleMapsReverseQuery extends ReverseQuery {
    private readonly resultTypes?;
    private readonly locationTypes?;
    private readonly channel?;
    protected constructor({ resultTypes, locationTypes, channel, ...reverseQueryObject }: GoogleMapsReverseQueryObject);
    static create(object: GoogleMapsReverseQueryObject): GoogleMapsReverseQuery;
    toObject(): GoogleMapsReverseQueryObject;
    withResultTypes(resultTypes: string[]): GoogleMapsReverseQuery;
    getResultTypes(): undefined | string[];
    withLocationTypes(locationTypes: string[]): GoogleMapsReverseQuery;
    getLocationTypes(): undefined | string[];
    withChannel(channel: string): GoogleMapsReverseQuery;
    getChannel(): undefined | string;
}
//# sourceMappingURL=GoogleMapsReverseQuery.d.ts.map