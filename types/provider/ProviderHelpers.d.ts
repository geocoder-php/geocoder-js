import { GeocodedResultsCallback } from "./";
import { GeocodeQuery, GeocodeQueryObject, ReverseQuery, ReverseQueryObject } from "../query";
export default class ProviderHelpers {
    static getGeocodeQueryFromParameter(query: string | GeocodeQuery | GeocodeQueryObject, geocodeQuery?: typeof GeocodeQuery): GeocodeQuery;
    static getReverseQueryFromParameters(latitudeOrQuery: number | string | ReverseQuery | ReverseQueryObject, longitudeOrCallback: number | string | GeocodedResultsCallback, reverseQuery?: typeof ReverseQuery): ReverseQuery;
    static getCallbackFromParameters(longitudeOrCallback: number | string | GeocodedResultsCallback, callback?: GeocodedResultsCallback): GeocodedResultsCallback;
}
//# sourceMappingURL=ProviderHelpers.d.ts.map