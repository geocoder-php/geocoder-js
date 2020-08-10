import { ExternalLoaderHeaders, ExternalLoaderInterface, ExternalLoaderParams } from "../../ExternalLoader";
import { ErrorCallback, GeocodedResultsCallback, NominatimGeocoded, NominatimReverseQuery, NominatimReverseQueryObject, NominatimGeocodeQueryObject, NominatimGeocodeQuery, ProviderInterface, ProviderOptionsInterface } from "./..";
interface NominatimErrorResponse {
    error: string;
}
export declare type NominatimResponse = NominatimErrorResponse | NominatimResult | NominatimResult[];
export interface NominatimResult {
    place_id: number;
    licence: string;
    osm_type: string;
    osm_id: number;
    boundingbox: [string, string, string, string];
    lat: string;
    lon: string;
    display_name: string;
    category: string;
    type: string;
    importance: number;
    icon: string;
    address: {
        attraction?: string;
        house_number?: string;
        road?: string;
        pedestrian?: string;
        neighbourhood?: string;
        suburb?: string;
        city?: string;
        town?: string;
        village?: string;
        hamlet?: string;
        state?: string;
        county?: string;
        postcode?: string;
        country?: string;
        country_code?: string;
    };
}
export interface NominatimProviderOptionsInterface extends ProviderOptionsInterface {
    readonly host?: string;
    readonly userAgent: string;
    readonly referer?: string;
}
export declare const defaultNominatimProviderOptions: {
    host: string;
    userAgent: string;
    useSsl?: boolean | undefined;
    useJsonp?: boolean | undefined;
    apiKey?: string | undefined;
};
export default class NominatimProvider implements ProviderInterface {
    private externalLoader;
    private options;
    constructor(_externalLoader: ExternalLoaderInterface, options?: NominatimProviderOptionsInterface);
    geocode(query: string | NominatimGeocodeQuery | NominatimGeocodeQueryObject, callback: GeocodedResultsCallback, errorCallback?: ErrorCallback): void;
    geodecode(latitudeOrQuery: number | string | NominatimReverseQuery | NominatimReverseQueryObject, longitudeOrCallback: number | string | GeocodedResultsCallback, callbackOrErrorCallback?: GeocodedResultsCallback | ErrorCallback, errorCallback?: ErrorCallback): void;
    private withCommonParams;
    private getHeaders;
    executeRequest(params: ExternalLoaderParams, callback: GeocodedResultsCallback, headers?: ExternalLoaderHeaders, errorCallback?: ErrorCallback): void;
    static mapToGeocoded(result: NominatimResult): NominatimGeocoded;
}
export {};
//# sourceMappingURL=NominatimProvider.d.ts.map