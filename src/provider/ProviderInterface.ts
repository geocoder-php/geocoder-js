import { ExternalLoaderHeaders, ExternalLoaderParams } from "ExternalLoader";
import Geocoded from "Geocoded";
import {
  GeocodeQuery,
  GeocodeQueryObject,
  ReverseQuery,
  ReverseQueryObject,
} from "query";
import { ResponseError } from "error";

export const DEFAULT_RESULT_LIMIT = 5;

export const defaultProviderOptions: ProviderOptionsInterface = {
  useSsl: false,
  useJsonp: false,
};

export interface ProviderOptionsInterface {
  readonly useSsl?: boolean;
  readonly useJsonp?: boolean;
  readonly apiKey?: string;
}

export type GeocodedResultsCallback = (results: Geocoded[]) => void;
export type ErrorCallback = (responseError: ResponseError) => void;

export default interface ProviderInterface {
  geocode(
    query: string | GeocodeQuery | GeocodeQueryObject,
    callback: GeocodedResultsCallback,
    errorCallback?: ErrorCallback
  ): void;
  geodecode(
    latitudeOrQuery: number | string | ReverseQuery | ReverseQueryObject,
    longitudeOrCallback: number | string | GeocodedResultsCallback,
    callbackOrErrorCallback?: GeocodedResultsCallback | ErrorCallback,
    errorCallback?: ErrorCallback
  ): void;
  executeRequest(
    params: ExternalLoaderParams,
    callback: GeocodedResultsCallback,
    headers?: ExternalLoaderHeaders,
    errorCallback?: ErrorCallback
  ): void;
}
