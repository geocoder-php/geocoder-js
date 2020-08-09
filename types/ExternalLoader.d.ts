import { ResponseError } from "./error";
export interface ExternalLoaderInterface {
    setOptions(options: ExternalLoaderOptions): void;
    getOptions(): ExternalLoaderOptions;
    executeRequest(params: ExternalLoaderParams, callback: ResponseCallback, headers?: ExternalLoaderHeaders, errorCallback?: ErrorCallback): void;
}
export interface ExternalLoaderOptions {
    readonly protocol: string;
    readonly host?: string;
    readonly pathname?: string;
}
export interface ExternalLoaderParams {
    [param: string]: string | undefined;
    jsonpCallback?: string;
}
export interface ExternalLoaderHeaders {
    [header: string]: string | undefined;
}
declare type ResponseCallback = (response: any) => void;
export declare type ErrorCallback = (responseError: ResponseError) => void;
/**
 * Load data from external geocoding engines.
 */
export default class ExternalLoader implements ExternalLoaderInterface {
    private options;
    constructor(options?: ExternalLoaderOptions);
    setOptions(options: ExternalLoaderOptions): void;
    getOptions(): ExternalLoaderOptions;
    executeRequest(params: ExternalLoaderParams, callback: ResponseCallback, externalLoaderHeaders?: ExternalLoaderHeaders, errorCallback?: ErrorCallback): void;
    private static runJsonpCallback;
    /**
     * Generates randomly-named function to use as a callback for JSONP requests.
     * @see https://github.com/OscarGodson/JSONP
     */
    private static generateJsonpCallback;
}
export {};
//# sourceMappingURL=ExternalLoader.d.ts.map