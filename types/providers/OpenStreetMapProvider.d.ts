import { ExternalLoaderInterface, ExternalLoaderParams } from "ExternalURILoader";
import { GeocodedResultsCallback, ProviderInterface, ProviderOptionsInterface } from "providers";
import Geocoded from "Geocoded";
import { GeocodeQuery, GeocodeQueryObject, ReverseQuery, ReverseQueryObject } from "query";
export interface OpenStreetMapResult {
    place_id: number;
    licence: string;
    osm_type: string;
    osm_id: number;
    boundingbox: [string, string, string, string];
    lat: string;
    lon: string;
    display_name: string;
    class: string;
    type: string;
    importance: number;
    icon: string;
    address: {
        attraction?: string;
        house_number?: string;
        road?: string;
        neighbourhood?: string;
        suburb?: string;
        city?: string;
        town?: string;
        village?: string;
        hamlet?: string;
        state?: string;
        postcode?: string;
        country?: string;
        country_code?: string;
    };
}
export default class OpenStreetMapProvider implements ProviderInterface {
    private externalLoader;
    private options;
    constructor(_externalLoader: ExternalLoaderInterface, options?: ProviderOptionsInterface);
    geocode(query: string | GeocodeQuery | GeocodeQueryObject, callback: GeocodedResultsCallback): void;
    geodecode(latitudeOrQuery: number | string | ReverseQuery | ReverseQueryObject, longitudeOrCallback: number | string | GeocodedResultsCallback, callback?: GeocodedResultsCallback): void;
    executeRequest(params: ExternalLoaderParams, callback: GeocodedResultsCallback): void;
    static mapToGeocoded(result: OpenStreetMapResult): Geocoded;
}
//# sourceMappingURL=OpenStreetMapProvider.d.ts.map