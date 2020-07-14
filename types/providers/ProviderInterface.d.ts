import { ExternalLoaderHeaders, ExternalLoaderParams } from "ExternalURILoader";
import Geocoded from "Geocoded";
import { GeocodeQuery, GeocodeQueryObject, ReverseQuery, ReverseQueryObject } from "query";
export declare const DEFAULT_RESULT_LIMIT = 5;
export declare const defaultProviderOptions: ProviderOptionsInterface;
export interface ProviderOptionsInterface {
    readonly useSsl: boolean;
    readonly useJsonp: boolean;
    readonly apiKey?: string;
}
export declare type GeocodedResultsCallback = (results: Geocoded[]) => void;
export default interface ProviderInterface {
    geocode(query: string | GeocodeQuery | GeocodeQueryObject, callback: GeocodedResultsCallback): void;
    geodecode(latitudeOrQuery: number | string | ReverseQuery | ReverseQueryObject, longitudeOrCallback: number | string | GeocodedResultsCallback, callback?: GeocodedResultsCallback): void;
    executeRequest(params: ExternalLoaderParams, callback: GeocodedResultsCallback, headers?: ExternalLoaderHeaders): void;
}
//# sourceMappingURL=ProviderInterface.d.ts.map