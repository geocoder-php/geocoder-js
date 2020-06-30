export interface ExternalLoaderInterface {
    setOptions(options: ExternalLoaderOptions): void;
    executeRequest(params: ExternalLoaderParams, callback: ResponseCallback): void;
}
export interface ExternalLoaderOptions {
    readonly protocol: null | string;
    readonly host: null | string;
    readonly pathname: null | string;
}
export interface ExternalLoaderParams {
    [param: string]: string | undefined;
    JSONPCallback?: string;
}
declare type ResponseCallback = (response: any) => void;
/**
 * Load data from external geocoding engines.
 */
export default class ExternalURILoader implements ExternalLoaderInterface {
    private options;
    constructor(options?: ExternalLoaderOptions);
    setOptions(options: ExternalLoaderOptions): void;
    executeRequest(params: ExternalLoaderParams, callback: ResponseCallback): void;
    private static runJsonpCallback;
    /**
     * Generates randomly-named function to use as a callback for JSONP requests.
     * @see https://github.com/OscarGodson/JSONP
     */
    private static generateJsonpCallback;
}
export {};
//# sourceMappingURL=ExternalURILoader.d.ts.map