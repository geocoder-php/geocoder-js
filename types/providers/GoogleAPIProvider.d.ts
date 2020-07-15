import { ExternalLoaderInterface, ExternalLoaderParams } from "../ExternalURILoader";
import { GeocodedResultsCallback, ProviderInterface, ProviderOptionsInterface } from "./";
import Geocoded from "../Geocoded";
import { GeocodeQuery, GeocodeQueryObject, ReverseQuery, ReverseQueryObject } from "../query";
interface GoogleApiLatLng {
    lat: number;
    lng: number;
}
export interface GoogleApiResult {
    geometry: {
        location: GoogleApiLatLng;
        bounds: {
            southwest: GoogleApiLatLng;
            northeast: GoogleApiLatLng;
        };
    };
    formatted_address: string;
    address_components: {
        types: ("street_number" | "route" | "sublocality" | "locality" | "postal_code" | "administrative_area_level_1" | "country")[];
        long_name: string;
        short_name: string;
    }[];
}
export default class GoogleApiProvider implements ProviderInterface {
    private externalLoader;
    private options;
    constructor(_externalLoader: ExternalLoaderInterface, options?: ProviderOptionsInterface);
    geocode(query: string | GeocodeQuery | GeocodeQueryObject, callback: GeocodedResultsCallback): void;
    geodecode(latitudeOrQuery: number | string | ReverseQuery | ReverseQueryObject, longitudeOrCallback: number | string | GeocodedResultsCallback, callback?: GeocodedResultsCallback): void;
    executeRequest(params: ExternalLoaderParams, callback: GeocodedResultsCallback): void;
    static mapToGeocoded(result: GoogleApiResult): Geocoded;
}
export {};
//# sourceMappingURL=GoogleAPIProvider.d.ts.map