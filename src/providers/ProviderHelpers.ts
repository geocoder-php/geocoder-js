import { GeocodedResultsCallback } from "providers";
import {
  GeocodeQuery,
  GeocodeQueryObject,
  ReverseQuery,
  ReverseQueryObject,
} from "query";

export default class ProviderHelpers {
  public static getGeocodeQueryFromParameter(
    query: string | GeocodeQuery | GeocodeQueryObject,
    geocodeQuery = GeocodeQuery
  ): GeocodeQuery {
    if (typeof query === "string") {
      return geocodeQuery.create({ text: query });
    }
    if (!(query instanceof geocodeQuery)) {
      return geocodeQuery.create(query);
    }

    return query;
  }

  public static getReverseQueryFromParameters(
    latitudeOrQuery: number | string | ReverseQuery | ReverseQueryObject,
    longitudeOrCallback: number | string | GeocodedResultsCallback,
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

  public static getCallbackFromParameters(
    longitudeOrCallback: number | string | GeocodedResultsCallback,
    callback?: GeocodedResultsCallback
  ): GeocodedResultsCallback {
    if (
      !(
        typeof longitudeOrCallback === "number" ||
        typeof longitudeOrCallback === "string"
      )
    ) {
      return longitudeOrCallback;
    }
    if (callback) {
      return callback;
    }

    throw new Error(
      "A callback must be set at the last parameter of geodecode"
    );
  }
}
