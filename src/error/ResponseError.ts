import {
  BingResponse,
  GeoPluginResult,
  GoogleMapsResponse,
  MapboxResponse,
  MapQuestResponse,
  NominatimResponse,
  OpenCageResponse,
} from "provider";

export default class ResponseError extends Error {
  public __proto__: ResponseError;

  private readonly response:
    | Response
    | BingResponse
    | GeoPluginResult
    | GoogleMapsResponse
    | MapboxResponse
    | MapQuestResponse
    | NominatimResponse
    | OpenCageResponse;

  public constructor(
    message: string,
    response:
      | Response
      | BingResponse
      | GeoPluginResult
      | GoogleMapsResponse
      | MapboxResponse
      | MapQuestResponse
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
    | BingResponse
    | GeoPluginResult
    | GoogleMapsResponse
    | MapboxResponse
    | MapQuestResponse
    | NominatimResponse
    | OpenCageResponse {
    return this.response;
  }
}
