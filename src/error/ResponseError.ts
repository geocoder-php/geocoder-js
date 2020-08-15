import {
  GeoPluginResult,
  GoogleMapsResponse,
  MapboxResponse,
  NominatimResponse,
  OpenCageResponse,
} from "provider";

export default class ResponseError extends Error {
  public __proto__: ResponseError;

  private readonly response:
    | Response
    | GeoPluginResult
    | GoogleMapsResponse
    | MapboxResponse
    | NominatimResponse
    | OpenCageResponse;

  public constructor(
    message: string,
    response:
      | Response
      | GeoPluginResult
      | GoogleMapsResponse
      | MapboxResponse
      | NominatimResponse
      | OpenCageResponse
  ) {
    super(message);
    this.name = "ResponseError";
    this.response = response;

    // eslint-disable-next-line no-proto
    this.__proto__ = ResponseError.prototype;
  }

  public getResponse():
    | Response
    | GeoPluginResult
    | GoogleMapsResponse
    | MapboxResponse
    | NominatimResponse
    | OpenCageResponse {
    return this.response;
  }
}
