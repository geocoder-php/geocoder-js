import { ErrorCallback, GeocodedResultsCallback } from "provider";
import Geocoded from "Geocoded";
import {
  GeocodeQuery,
  GeocodeQueryObject,
  ReverseQuery,
  ReverseQueryObject,
} from "query";
import { isIpv4, isIpv6 } from "utils";

export default class ProviderHelpers {
  public static getGeocodeQueryFromParameter(
    query: string | GeocodeQuery | GeocodeQueryObject,
    geocodeQuery = GeocodeQuery
  ): GeocodeQuery {
    if (typeof query === "string") {
      if (isIpv4(query) || isIpv6(query)) {
        return geocodeQuery.create({ ip: query });
      }
      return geocodeQuery.create({ text: query });
    }
    if (!(query instanceof geocodeQuery)) {
      return geocodeQuery.create(query);
    }

    return query;
  }

  public static getReverseQueryFromParameters<G extends Geocoded>(
    latitudeOrQuery: number | string | ReverseQuery | ReverseQueryObject,
    longitudeOrCallback: number | string | GeocodedResultsCallback<G>,
    reverseQuery = ReverseQuery
  ): ReverseQuery {
    if (
      typeof latitudeOrQuery === "number" ||
      typeof latitudeOrQuery === "string"
    ) {
      if (
        !(
          typeof longitudeOrCallback === "number" ||
          typeof longitudeOrCallback === "string"
        )
      ) {
        throw new Error(
          "The second parameter of geodecode must be a longitude if the first one is a latitude"
        );
      }
      return reverseQuery.create({
        latitude: latitudeOrQuery,
        longitude: longitudeOrCallback,
      });
    }
    if (!(latitudeOrQuery instanceof reverseQuery)) {
      return reverseQuery.create(latitudeOrQuery);
    }

    return latitudeOrQuery;
  }

  public static getCallbackFromParameters<G extends Geocoded>(
    longitudeOrCallback: number | string | GeocodedResultsCallback<G>,
    callbackOrErrorCallback?: GeocodedResultsCallback<G> | ErrorCallback
  ): GeocodedResultsCallback<G> {
    if (
      !(
        typeof longitudeOrCallback === "number" ||
        typeof longitudeOrCallback === "string"
      )
    ) {
      return longitudeOrCallback;
    }
    if (callbackOrErrorCallback) {
      return <GeocodedResultsCallback<G>>callbackOrErrorCallback;
    }

    throw new Error(
      "A callback must be set at the last parameter of geodecode"
    );
  }

  public static getErrorCallbackFromParameters<G extends Geocoded>(
    longitudeOrCallback: number | string | GeocodedResultsCallback<G>,
    callbackOrErrorCallback?: GeocodedResultsCallback<G> | ErrorCallback,
    errorCallback?: ErrorCallback
  ): undefined | ErrorCallback {
    if (errorCallback) {
      return errorCallback;
    }

    if (
      typeof longitudeOrCallback === "number" ||
      typeof longitudeOrCallback === "string"
    ) {
      return undefined;
    }

    return <undefined | ErrorCallback>callbackOrErrorCallback;
  }
}
