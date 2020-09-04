import {
  ExternalLoaderBody,
  ExternalLoaderHeaders,
  ExternalLoaderParams,
} from "ExternalLoader";
import Geocoded from "Geocoded";
import {
  GeocodeQuery,
  GeocodeQueryObject,
  ReverseQuery,
  ReverseQueryObject,
} from "query";
import { ResponseError } from "error";

export const DEFAULT_RESULT_LIMIT = 5;

export interface ProviderOptionsInterface {
  readonly useSsl?: boolean;
  readonly useJsonp?: boolean;
  readonly apiKey?: string;
}

export const defaultProviderOptions: ProviderOptionsInterface = {
  useSsl: false,
  useJsonp: false,
};

export type GeocodedResultsCallback<G extends Geocoded> = (
  results: G[]
) => void;
export type ErrorCallback = (responseError: ResponseError) => void;

export default interface ProviderInterface<G extends Geocoded> {
  geocode(
    query: string | GeocodeQuery | GeocodeQueryObject,
    callback: GeocodedResultsCallback<G>,
    errorCallback?: ErrorCallback
  ): void;
  geodecode(
    latitudeOrQuery: number | string | ReverseQuery | ReverseQueryObject,
    longitudeOrCallback: number | string | GeocodedResultsCallback<G>,
    callbackOrErrorCallback?: GeocodedResultsCallback<G> | ErrorCallback,
    errorCallback?: ErrorCallback
  ): void;
  executeRequest(
    params: ExternalLoaderParams,
    callback: GeocodedResultsCallback<G>,
    headers?: ExternalLoaderHeaders,
    body?: ExternalLoaderBody,
    errorCallback?: ErrorCallback
  ): void;
}
