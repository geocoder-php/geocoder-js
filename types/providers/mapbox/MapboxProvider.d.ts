import { ExternalLoaderInterface, ExternalLoaderParams } from "../../ExternalURILoader";
import { GeocodedResultsCallback, MapboxGeocodeQuery, MapboxGeocodeQueryObject, MapboxReverseQuery, MapboxReverseQueryObject, ProviderInterface, ProviderOptionsInterface } from "./..";
import Geocoded from "../../Geocoded";
import { Box } from "../../types";
interface MapboxFeatureContextProperties {
    id: string;
    text: string;
    wikidata?: string;
    short_code?: string;
}
interface MapboxFeatureProperties {
    accuracy?: string;
    address?: string;
    category?: string;
    maki?: string;
    wikidata?: string;
    short_code?: string;
}
export interface MapboxResult {
    id: string;
    type: "Feature";
    place_type: ("country" | "region" | "postcode" | "district" | "place" | "locality" | "neighborhood" | "address" | "poi")[];
    relevance: number;
    address?: string;
    properties: MapboxFeatureProperties;
    text: string;
    place_name: string;
    matching_text?: string;
    matching_place_name?: string;
    language?: string;
    bbox?: Box;
    center: [number, number];
    geometry: {
        type: "Point";
        coordinates: [number, number];
    };
    context?: MapboxFeatureContextProperties[];
    routable_points?: {
        points?: {
            coordinates: [number, number];
        }[];
    };
}
export declare enum MAPBOX_GEOCODING_MODES {
    GEOCODING_MODE_PLACES = "mapbox.places",
    GEOCODING_MODE_PLACES_PERMANENT = "mapbox.places-permanent"
}
export interface MapboxProviderOptionsInterface extends ProviderOptionsInterface {
    readonly apiKey: string;
    readonly geocodingMode?: MAPBOX_GEOCODING_MODES;
    readonly country?: string;
}
export declare const defaultMapboxProviderOptions: {
    apiKey: string;
    geocodingMode: MAPBOX_GEOCODING_MODES;
    useSsl?: boolean | undefined;
    useJsonp?: boolean | undefined;
};
export default class MapboxProvider implements ProviderInterface {
    private externalLoader;
    private options;
    constructor(_externalLoader: ExternalLoaderInterface, options?: MapboxProviderOptionsInterface);
    geocode(query: string | MapboxGeocodeQuery | MapboxGeocodeQueryObject, callback: GeocodedResultsCallback): void;
    geodecode(latitudeOrQuery: number | string | MapboxReverseQuery | MapboxReverseQueryObject, longitudeOrCallback: number | string | GeocodedResultsCallback, callback?: GeocodedResultsCallback): void;
    executeRequest(params: ExternalLoaderParams, callback: GeocodedResultsCallback): void;
    static mapToGeocoded(result: MapboxResult): Geocoded;
}
export {};
//# sourceMappingURL=MapboxProvider.d.ts.map