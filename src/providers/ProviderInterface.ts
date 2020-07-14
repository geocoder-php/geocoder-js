import { ExternalLoaderHeaders, ExternalLoaderParams } from "ExternalURILoader";
import Geocoded from "Geocoded";
import {
  GeocodeQuery,
  GeocodeQueryObject,
  ReverseQuery,
  ReverseQueryObject,
} from "query";

export const DEFAULT_RESULT_LIMIT = 5;

export const defaultProviderOptions: ProviderOptionsInterface = {
  useSsl: false,
  useJsonp: false,
};

export interface ProviderOptionsInterface {
  readonly useSsl: boolean;
  readonly useJsonp: boolean;
  readonly apiKey?: string;
}

export type GeocodedResultsCallback = (results: Geocoded[]) => void;

export default interface ProviderInterface {
  geocode(
    query: string | GeocodeQuery | GeocodeQueryObject,
    callback: GeocodedResultsCallback
  ): void;
  geodecode(
    latitudeOrQuery: number | string | ReverseQuery | ReverseQueryObject,
    longitudeOrCallback: number | string | GeocodedResultsCallback,
    callback?: GeocodedResultsCallback
  ): void;
  executeRequest(
    params: ExternalLoaderParams,
    callback: GeocodedResultsCallback,
    headers?: ExternalLoaderHeaders
  ): void;
}
