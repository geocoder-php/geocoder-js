import { ExternalLoaderParams } from "../ExternalLoader";
import { ErrorCallback, GeocodedResultsCallback, ProviderInterface, ProviderOptionsInterface } from "./";
import { GeocodeQuery, GeocodeQueryObject, ReverseQuery, ReverseQueryObject } from "../query";
export interface ChainProviderOptionsInterface extends ProviderOptionsInterface {
    readonly providers: ProviderInterface[];
    readonly parallelize?: boolean;
    readonly first?: boolean;
}
export declare const defaultChainProviderOptions: {
    providers: never[];
    useSsl?: boolean | undefined;
    useJsonp?: boolean | undefined;
    apiKey?: string | undefined;
};
export default class ChainProvider implements ProviderInterface {
    private options;
    constructor(options?: ChainProviderOptionsInterface);
    geocode(query: string | GeocodeQuery | GeocodeQueryObject, callback: GeocodedResultsCallback, errorCallback?: ErrorCallback): void;
    geodecode(latitudeOrQuery: number | string | ReverseQuery | ReverseQueryObject, longitudeOrCallback: number | string | GeocodedResultsCallback, callbackOrErrorCallback?: GeocodedResultsCallback | ErrorCallback, errorCallback?: ErrorCallback): void;
    private geocodeNextProvider;
    private geodecodeNextProvider;
    private geocodeAllProviders;
    private geodecodeAllProviders;
    executeRequest(params: ExternalLoaderParams, callback: GeocodedResultsCallback): void;
}
//# sourceMappingURL=ChainProvider.d.ts.map