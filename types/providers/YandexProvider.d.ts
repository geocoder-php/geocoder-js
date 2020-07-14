import { ExternalLoaderInterface, ExternalLoaderParams } from "ExternalURILoader";
import { GeocodedResultsCallback, ProviderInterface, ProviderOptionsInterface } from "providers";
import Geocoded from "Geocoded";
import { GeocodeQuery, GeocodeQueryObject, ReverseQuery, ReverseQueryObject } from "query";
export interface YandexResult {
    metaDataProperty: {
        GeocoderMetaData: {
            kind: string;
            text: string;
            precision: string;
            AddressDetails: {
                Country: {
                    AddressLine: string;
                    CountryNameCode: string;
                    CountryName: string;
                    AdministrativeArea?: {
                        AdministrativeAreaName: string;
                        SubAdministrativeArea?: {
                            SubAdministrativeAreaName: string;
                            Locality?: {
                                LocalityName: string;
                                Thoroughfare?: {
                                    ThoroughfareName: string;
                                    Premise: {
                                        PremiseNumber: string;
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    };
    description: string;
    name: string;
    boundedBy: {
        Envelope: {
            lowerCorner: string;
            upperCorner: string;
        };
    };
    Point: {
        pos: string;
    };
}
export interface YandexProviderOptionsInterface extends ProviderOptionsInterface {
    readonly toponym?: "house" | "street" | "metro" | "district" | "locality";
}
export default class YandexProvider implements ProviderInterface {
    private externalLoader;
    private options;
    constructor(_externalLoader: ExternalLoaderInterface, options?: YandexProviderOptionsInterface);
    geocode(query: string | GeocodeQuery | GeocodeQueryObject, callback: GeocodedResultsCallback): void;
    geodecode(latitudeOrQuery: number | string | ReverseQuery | ReverseQueryObject, longitudeOrCallback: number | string | GeocodedResultsCallback, callback?: GeocodedResultsCallback): void;
    executeRequest(params: ExternalLoaderParams, callback: GeocodedResultsCallback): void;
    static mapToGeocoded(result: YandexResult): Geocoded;
    private static flattenObject;
}
//# sourceMappingURL=YandexProvider.d.ts.map