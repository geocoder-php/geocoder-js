import { PartialSome } from "../types";
import { Coordinates } from "../index";
declare type ReverseQueryObjectCreate = PartialSome<ReverseQueryObject, "limit">;
export interface ReverseQueryObject {
    readonly latitude: number | string;
    readonly longitude: number | string;
    readonly locale?: string;
    readonly limit: number;
}
export default class ReverseQuery {
    private readonly latitude;
    private readonly longitude;
    private readonly locale?;
    private readonly limit;
    protected constructor({ latitude, longitude, locale, limit, }: ReverseQueryObjectCreate);
    static create(object: ReverseQueryObjectCreate): ReverseQuery;
    toObject(): ReverseQueryObject;
    withCoordinates(latitude: number, longitude: number): ReverseQuery;
    withLocale(locale: string): ReverseQuery;
    withLimit(limit: number): ReverseQuery;
    getCoordinates(): Coordinates;
    getLocale(): undefined | string;
    getLimit(): number;
}
export {};
//# sourceMappingURL=ReverseQuery.d.ts.map