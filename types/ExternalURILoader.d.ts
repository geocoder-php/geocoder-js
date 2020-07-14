export interface ExternalLoaderInterface {
    setOptions(options: ExternalLoaderOptions): void;
    executeRequest(params: ExternalLoaderParams, callback: ResponseCallback, headers?: ExternalLoaderHeaders): void;
}
export interface ExternalLoaderOptions {
    readonly protocol: string;
    readonly host?: string;
    readonly pathname?: string;
}
export interface ExternalLoaderParams {
    [param: string]: string | undefined;
    JSONPCallback?: string;
}
export interface ExternalLoaderHeaders {
    [header: string]: string;
}
declare type ResponseCallback = (response: any) => void;
/**
 * Load data from external geocoding engines.
 */
export default class ExternalURILoader implements ExternalLoaderInterface {
    private options;
    constructor(options?: ExternalLoaderOptions);
    setOptions(options: ExternalLoaderOptions): void;
    executeRequest(params: ExternalLoaderParams, callback: ResponseCallback, externalLoaderHeaders?: ExternalLoaderHeaders): void;
    private static runJsonpCallback;
    /**
     * Generates randomly-named function to use as a callback for JSONP requests.
     * @see https://github.com/OscarGodson/JSONP
     */
    private static generateJsonpCallback;
}
export {};
//# sourceMappingURL=ExternalURILoader.d.ts.map