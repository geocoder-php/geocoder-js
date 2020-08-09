import { GeocodeQuery, GeocodeQueryObject } from "../../query";
interface GoogleMapsComponent {
    name: string;
    value: string;
}
export interface GoogleMapsGeocodeQueryObject extends GeocodeQueryObject {
    readonly countryCodes?: string[];
    readonly components?: GoogleMapsComponent[];
    readonly channel?: string;
}
export default class GoogleMapsGeocodeQuery extends GeocodeQuery {
    private readonly countryCodes?;
    private readonly components?;
    private readonly channel?;
    protected constructor({ countryCodes, components, channel, ...geocodeQueryObject }: GoogleMapsGeocodeQueryObject);
    static create(object: GoogleMapsGeocodeQueryObject): GoogleMapsGeocodeQuery;
    toObject(): GoogleMapsGeocodeQueryObject;
    withCountryCodes(countryCodes: string[]): GoogleMapsGeocodeQuery;
    getCountryCodes(): undefined | string[];
    withComponents(components: GoogleMapsComponent[]): GoogleMapsGeocodeQuery;
    getComponents(): undefined | GoogleMapsComponent[];
    withChannel(channel: string): GoogleMapsGeocodeQuery;
    getChannel(): undefined | string;
}
export {};
//# sourceMappingURL=GoogleMapsGeocodeQuery.d.ts.map