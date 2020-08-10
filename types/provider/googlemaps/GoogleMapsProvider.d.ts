import { ExternalLoaderHeaders, ExternalLoaderInterface, ExternalLoaderParams } from "../../ExternalLoader";
import { ErrorCallback, GeocodedResultsCallback, GoogleMapsGeocoded, GoogleMapsGeocodeQuery, GoogleMapsGeocodeQueryObject, GoogleMapsReverseQuery, GoogleMapsReverseQueryObject, ProviderInterface, ProviderOptionsInterface } from "./..";
interface GoogleMapsLatLng {
    lat: number;
    lng: number;
}
declare type GoogleMapsPlaceType = "airport" | "administrative_area_level_1" | "administrative_area_level_2" | "administrative_area_level_3" | "administrative_area_level_4" | "administrative_area_level_5" | "archipelago" | "bus_station" | "colloquial_area" | "continent" | "country" | "establishment" | "finance" | "floor" | "food" | "general_contractor" | "geocode" | "health" | "intersection" | "locality" | "natural_feature" | "neighborhood" | "park" | "parking" | "place_of_worship" | "plus_code" | "point_of_interest" | "political" | "post_box" | "postal_code" | "postal_code_prefix" | "postal_code_suffix" | "postal_town" | "premise" | "room" | "route" | "street_address" | "street_number" | "sublocality" | "sublocality_level_1" | "sublocality_level_2" | "sublocality_level_3" | "sublocality_level_4" | "sublocality_level_5" | "subpremise" | "town_square" | "train_station" | "transit_station" | "ward";
export interface GoogleMapsResponse {
    results: GoogleMapsResult[];
    status: "OK" | "ZERO_RESULTS" | "OVER_DAILY_LIMIT" | "OVER_QUERY_LIMIT" | "REQUEST_DENIED" | "INVALID_REQUEST" | "UNKNOWN_ERROR";
    error_message?: string;
}
export interface GoogleMapsResult {
    geometry: {
        location: GoogleMapsLatLng;
        location_type: "ROOFTOP" | "RANGE_INTERPOLATED" | "GEOMETRIC_CENTER" | "APPROXIMATE";
        viewport: {
            northeast: GoogleMapsLatLng;
            southwest: GoogleMapsLatLng;
        };
        bounds?: {
            northeast: GoogleMapsLatLng;
            southwest: GoogleMapsLatLng;
        };
    };
    formatted_address: string;
    address_components: {
        types: GoogleMapsPlaceType[];
        long_name: string;
        short_name: string;
    }[];
    place_id: string;
    plus_code?: {
        global_code: string;
        compound_code?: string;
    };
    types: GoogleMapsPlaceType[];
    postcode_localities?: string[];
    partial_match?: boolean;
}
export interface GoogleMapsProviderOptionsInterface extends ProviderOptionsInterface {
    readonly apiKey?: string;
    readonly secret?: string;
    readonly clientId?: string;
    readonly countryCodes?: string[];
}
export default class GoogleMapsProvider implements ProviderInterface {
    private externalLoader;
    private options;
    constructor(_externalLoader: ExternalLoaderInterface, options?: GoogleMapsProviderOptionsInterface);
    geocode(query: string | GoogleMapsGeocodeQuery | GoogleMapsGeocodeQueryObject, callback: GeocodedResultsCallback, errorCallback?: ErrorCallback): void;
    geodecode(latitudeOrQuery: number | string | GoogleMapsReverseQuery | GoogleMapsReverseQueryObject, longitudeOrCallback: number | string | GeocodedResultsCallback, callbackOrErrorCallback?: GeocodedResultsCallback | ErrorCallback, errorCallback?: ErrorCallback): void;
    private withCommonParams;
    executeRequest(params: ExternalLoaderParams, callback: GeocodedResultsCallback, headers?: ExternalLoaderHeaders, errorCallback?: ErrorCallback): void;
    static mapToGeocoded(result: GoogleMapsResult): GoogleMapsGeocoded;
    private static signQuery;
}
export {};
//# sourceMappingURL=GoogleMapsProvider.d.ts.map