import { ExternalLoaderHeaders, ExternalLoaderParams } from "../ExternalLoader";
import Geocoded from "../Geocoded";
import { GeocodeQuery, GeocodeQueryObject, ReverseQuery, ReverseQueryObject } from "../query";
import { ResponseError } from "../error";
export declare const DEFAULT_RESULT_LIMIT = 5;
export declare const defaultProviderOptions: ProviderOptionsInterface;
export interface ProviderOptionsInterface {
    readonly useSsl?: boolean;
    readonly useJsonp?: boolean;
    readonly apiKey?: string;
}
export declare type GeocodedResultsCallback = (results: Geocoded[]) => void;
export declare type ErrorCallback = (responseError: ResponseError) => void;
export default interface ProviderInterface {
    geocode(query: string | GeocodeQuery | GeocodeQueryObject, callback: GeocodedResultsCallback, errorCallback?: ErrorCallback): void;
    geodecode(latitudeOrQuery: number | string | ReverseQuery | ReverseQueryObject, longitudeOrCallback: number | string | GeocodedResultsCallback, callbackOrErrorCallback?: GeocodedResultsCallback | ErrorCallback, errorCallback?: ErrorCallback): void;
    executeRequest(params: ExternalLoaderParams, callback: GeocodedResultsCallback, headers?: ExternalLoaderHeaders, errorCallback?: ErrorCallback): void;
}
//# sourceMappingURL=ProviderInterface.d.ts.map