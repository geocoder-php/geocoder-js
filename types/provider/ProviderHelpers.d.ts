import { ErrorCallback, GeocodedResultsCallback } from "./";
import { GeocodeQuery, GeocodeQueryObject, ReverseQuery, ReverseQueryObject } from "../query";
export default class ProviderHelpers {
    static getGeocodeQueryFromParameter(query: string | GeocodeQuery | GeocodeQueryObject, geocodeQuery?: typeof GeocodeQuery): GeocodeQuery;
    static getReverseQueryFromParameters(latitudeOrQuery: number | string | ReverseQuery | ReverseQueryObject, longitudeOrCallback: number | string | GeocodedResultsCallback, reverseQuery?: typeof ReverseQuery): ReverseQuery;
    static getCallbackFromParameters(longitudeOrCallback: number | string | GeocodedResultsCallback, callbackOrErrorCallback?: GeocodedResultsCallback | ErrorCallback): GeocodedResultsCallback;
    static getErrorCallbackFromParameters(longitudeOrCallback: number | string | GeocodedResultsCallback, callbackOrErrorCallback?: GeocodedResultsCallback | ErrorCallback, errorCallback?: ErrorCallback): undefined | ErrorCallback;
}
//# sourceMappingURL=ProviderHelpers.d.ts.map