import Geocoded, { GeocodedObject } from "../../Geocoded";
export interface NominatimGeocodedObject extends GeocodedObject {
    readonly displayName?: string;
    readonly osmId?: number;
    readonly osmType?: string;
    readonly category?: string;
    readonly type?: string;
    readonly attribution?: string;
}
export default class NominatimGeocoded extends Geocoded {
    private readonly displayName?;
    private readonly osmId?;
    private readonly osmType?;
    private readonly category?;
    private readonly type?;
    private readonly attribution?;
    protected constructor({ displayName, osmId, osmType, category, type, attribution, ...geocodedObject }: NominatimGeocodedObject);
    static create(object: NominatimGeocodedObject): NominatimGeocoded;
    toObject(): NominatimGeocodedObject;
    withDisplayName(displayName: string): NominatimGeocoded;
    getDisplayName(): undefined | string;
    withOsmId(osmId: number): NominatimGeocoded;
    getOsmId(): undefined | number;
    withOsmType(osmType: string): NominatimGeocoded;
    getOsmType(): undefined | string;
    withCategory(category: string): NominatimGeocoded;
    getCategory(): undefined | string;
    withType(type: string): NominatimGeocoded;
    getType(): undefined | string;
    withAttribution(attribution: string): NominatimGeocoded;
    getAttribution(): undefined | string;
}
//# sourceMappingURL=NominatimGeocoded.d.ts.map