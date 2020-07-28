import Geocoded, { GeocodedObject } from "../../Geocoded";
export interface OpenCageGeocodedObject extends GeocodedObject {
    readonly callingCode?: number;
    readonly flag?: string;
    readonly mgrs?: string;
    readonly maidenhead?: string;
    readonly geohash?: string;
    readonly what3words?: string;
}
export default class OpenCageGeocoded extends Geocoded {
    private readonly callingCode?;
    private readonly flag?;
    private readonly mgrs?;
    private readonly maidenhead?;
    private readonly geohash?;
    private readonly what3words?;
    protected constructor({ callingCode, flag, mgrs, maidenhead, geohash, what3words, ...geocodedObject }: OpenCageGeocodedObject);
    static create(object: OpenCageGeocodedObject): OpenCageGeocoded;
    toObject(): OpenCageGeocodedObject;
    withCallingCode(callingCode: number): OpenCageGeocoded;
    getCallingCode(): undefined | number;
    withFlag(flag: string): OpenCageGeocoded;
    getFlag(): undefined | string;
    withMgrs(mgrs: string): OpenCageGeocoded;
    getMgrs(): undefined | string;
    withMaidenhead(maidenhead: string): OpenCageGeocoded;
    getMaidenhead(): undefined | string;
    withGeohash(geohash: string): OpenCageGeocoded;
    getGeohash(): undefined | string;
    withWhat3words(what3words: string): OpenCageGeocoded;
    getWhat3words(): undefined | string;
}
//# sourceMappingURL=OpenCageGeocoded.d.ts.map