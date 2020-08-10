import { ExternalLoaderHeaders, ExternalLoaderInterface, ExternalLoaderParams } from "../../ExternalLoader";
import { ErrorCallback, GeocodedResultsCallback, OpenCageGeocoded, OpenCageGeocodeQuery, OpenCageGeocodeQueryObject, OpenCageReverseQuery, OpenCageReverseQueryObject, ProviderInterface, ProviderOptionsInterface } from "./..";
interface OpenCageCoordinates {
    lat: number;
    lng: number;
}
interface OpenCageSun {
    apparent: number;
    astronomical: number;
    civil: number;
    nautical: number;
}
export interface OpenCageResponse {
    documentation: string;
    licences: {
        name: string;
        url: string;
    }[];
    rate: {
        limit: number;
        remaining: number;
        reset: number;
    };
    results: OpenCageResult[];
    status: {
        code: 200 | 400 | 401 | 402 | 403 | 404 | 405 | 408 | 410 | 429 | 503;
        message: string;
    };
    stay_informed: {
        blog: string;
        twitter: string;
    };
    thanks: string;
    timestamp: {
        created_http: string;
        created_unix: number;
    };
    total_results: number;
}
export interface OpenCageResult {
    annotations: {
        callingcode: number;
        currency: {
            alternate_symbols: string[];
            decimal_mark: string;
            disambiguate_symbol?: string;
            html_entity: string;
            iso_code: string;
            iso_numeric: string;
            name: string;
            smallest_denomination: number;
            subunit: string;
            subunit_to_unit: number;
            symbol: string;
            symbol_first: number;
            thousands_separator: string;
        };
        DMS: {
            lat: string;
            lng: string;
        };
        FIPS?: {
            state?: string;
            county?: string;
        };
        flag: string;
        geohash?: string;
        ITM?: {
            easting: string;
            northing: string;
        };
        Maidenhead?: string;
        Mercator: {
            x: number;
            y: number;
        };
        MGRS?: string;
        OSM: {
            edit_url?: string;
            note_url: string;
            url: string;
        };
        qibla: number;
        roadinfo: {
            drive_on: "left" | "right";
            road?: string;
            road_type?: string;
            road_reference?: string;
            road_reference_intl?: string;
            speed_in: "km/h" | "mph";
        };
        sun: {
            rise: OpenCageSun;
            set: OpenCageSun;
        };
        timezone: {
            name: string;
            now_in_dst: number;
            offset_sec: number;
            offset_string: string;
            short_name: string;
        };
        UN_M49: {
            regions: {
                [region: string]: string;
            };
            statistical_groupings: ("LDC" | "LEDC" | "LLDC" | "MEDC" | "SIDS")[];
        };
        what3words?: {
            words: string;
        };
        wikidata?: string;
    };
    bounds: {
        northeast: OpenCageCoordinates;
        southwest: OpenCageCoordinates;
    };
    components: {
        "ISO_3166-1_alpha-2"?: string;
        "ISO_3166-1_alpha-3"?: string;
        _category: "agriculture" | "building" | "castle" | "commerce" | "construction" | "education" | "financial" | "government" | "health" | "industrial" | "military" | "natural/water" | "outdoors/recreation" | "place" | "place_of_worship" | "postcode" | "road" | "social" | "transportation" | "travel/tourism" | "unknown";
        _type: string;
        castle?: string;
        city?: string;
        city_district?: string;
        continent?: "Africa" | "Antarctica" | "Asia" | "Europe" | "Oceania" | "North America" | "South America";
        country?: string;
        country_code?: string;
        county?: string;
        county_code?: string;
        croft?: string;
        district?: string;
        footway?: string;
        hamlet?: string;
        house_number?: string;
        houses?: string;
        locality?: string;
        municipality?: string;
        neighbourhood?: string;
        path?: string;
        pedestrian?: string;
        political_union?: string;
        postcode?: string;
        quarter?: string;
        residential?: string;
        road?: string;
        road_reference?: string;
        road_reference_intl?: string;
        road_type?: string;
        state?: string;
        state_code?: string;
        state_district?: string;
        street?: string;
        street_name?: string;
        subdivision?: string;
        suburb?: string;
        town?: string;
        village?: string;
    };
    confidence: number;
    formatted: string;
    geometry: OpenCageCoordinates;
}
export interface OpenCageProviderOptionsInterface extends ProviderOptionsInterface {
    readonly apiKey: string;
    readonly countryCodes?: string[];
}
export declare const defaultOpenCageProviderOptions: {
    apiKey: string;
    useSsl?: boolean | undefined;
    useJsonp?: boolean | undefined;
};
export default class OpenCageProvider implements ProviderInterface {
    private externalLoader;
    private options;
    constructor(_externalLoader: ExternalLoaderInterface, options?: OpenCageProviderOptionsInterface);
    geocode(query: string | OpenCageGeocodeQuery | OpenCageGeocodeQueryObject, callback: GeocodedResultsCallback, errorCallback?: ErrorCallback): void;
    geodecode(latitudeOrQuery: number | string | OpenCageReverseQuery | OpenCageReverseQueryObject, longitudeOrCallback: number | string | GeocodedResultsCallback, callbackOrErrorCallback?: GeocodedResultsCallback | ErrorCallback, errorCallback?: ErrorCallback): void;
    private withCommonParams;
    executeRequest(params: ExternalLoaderParams, callback: GeocodedResultsCallback, headers?: ExternalLoaderHeaders, errorCallback?: ErrorCallback): void;
    static mapToGeocoded(result: OpenCageResult): OpenCageGeocoded;
}
export {};
//# sourceMappingURL=OpenCageProvider.d.ts.map