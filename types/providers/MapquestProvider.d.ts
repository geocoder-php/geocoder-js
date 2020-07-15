import { ExternalLoaderInterface, ExternalLoaderParams } from "../ExternalURILoader";
import { GeocodedResultsCallback, ProviderInterface, ProviderOptionsInterface } from "./";
import Geocoded from "../Geocoded";
import { GeocodeQuery, GeocodeQueryObject, ReverseQuery, ReverseQueryObject } from "../query";
export interface MapQuestResult {
    latLng: {
        lat: number;
        lng: number;
    };
    displayLatLng: {
        lat: number;
        lng: number;
    };
    street: string;
    sideOfStreet: string;
    adminArea1?: string;
    adminArea1Type?: string;
    adminArea3?: string;
    adminArea3Type?: string;
    adminArea4?: string;
    adminArea4Type?: string;
    adminArea5?: string;
    adminArea5Type?: string;
    adminArea6?: string;
    adminArea6Type?: string;
    postalCode: string;
    type: string;
    linkId: string;
    dragPoint: boolean;
    geocodeQuality: string;
    geocodeQualityCode: string;
}
export default class MapQuestProvider implements ProviderInterface {
    private externalLoader;
    private options;
    constructor(_externalLoader: ExternalLoaderInterface, options?: ProviderOptionsInterface);
    geocode(query: string | GeocodeQuery | GeocodeQueryObject, callback: GeocodedResultsCallback): void;
    geodecode(latitudeOrQuery: number | string | ReverseQuery | ReverseQueryObject, longitudeOrCallback: number | string | GeocodedResultsCallback, callback?: GeocodedResultsCallback): void;
    executeRequest(params: ExternalLoaderParams, callback: GeocodedResultsCallback): void;
    static mapToGeocoded(result: MapQuestResult): Geocoded;
}
//# sourceMappingURL=MapquestProvider.d.ts.map