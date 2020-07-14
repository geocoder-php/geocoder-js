import { ExternalLoaderHeaders, ExternalLoaderInterface, ExternalLoaderParams } from "ExternalURILoader";
import { GeocodedResultsCallback, NominatimGeocoded, NominatimReverseQuery, NominatimReverseQueryObject, NominatimGeocodeQueryObject, NominatimGeocodeQuery, ProviderInterface, ProviderOptionsInterface } from "providers";
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
    readonly host: string;
    readonly userAgent?: string;
    readonly referer?: string;
}
export declare const defaultNominatimProviderOptions: {
    host: string;
    useSsl: boolean;
    useJsonp: boolean;
    apiKey?: string | undefined;
};
export default class NominatimProvider implements ProviderInterface {
    private externalLoader;
    private options;
    constructor(_externalLoader: ExternalLoaderInterface, options?: NominatimProviderOptionsInterface);
    geocode(query: string | NominatimGeocodeQuery | NominatimGeocodeQueryObject, callback: GeocodedResultsCallback): void;
    geodecode(latitudeOrQuery: number | string | NominatimReverseQuery | NominatimReverseQueryObject, longitudeOrCallback: number | string | GeocodedResultsCallback, callback?: GeocodedResultsCallback): void;
    private getCommonParams;
    private getHeaders;
    executeRequest(params: ExternalLoaderParams, callback: GeocodedResultsCallback, headers?: ExternalLoaderHeaders): void;
    static mapToGeocoded(result: NominatimResult): NominatimGeocoded;
}
//# sourceMappingURL=NominatimProvider.d.ts.map