import { PartialSome } from "../types";
import { Bounds } from "../index";
declare type GeocodeQueryObjectCreate = PartialSome<GeocodeQueryObject, "limit">;
export interface GeocodeQueryObject {
    readonly text: string;
    readonly south?: number | string;
    readonly west?: number | string;
    readonly north?: number | string;
    readonly east?: number | string;
    readonly locale?: string;
    readonly limit?: number;
}
export default class GeocodeQuery {
    private readonly text;
    private readonly south?;
    private readonly west?;
    private readonly north?;
    private readonly east?;
    private readonly locale?;
    private readonly limit;
    protected constructor({ text, south, west, north, east, locale, limit, }: GeocodeQueryObjectCreate);
    static create(object: GeocodeQueryObjectCreate): GeocodeQuery;
    toObject(): GeocodeQueryObject;
    withText(text: string): GeocodeQuery;
    withBounds(south?: number, west?: number, north?: number, east?: number): GeocodeQuery;
    withLocale(locale: string): GeocodeQuery;
    withLimit(limit: number): GeocodeQuery;
    getText(): string;
    getBounds(): undefined | Bounds;
    getLocale(): undefined | string;
    getLimit(): number;
}
export {};
//# sourceMappingURL=GeocodeQuery.d.ts.map