import { GoogleMapsResponse, MapboxResponse, NominatimResponse, OpenCageResponse } from "../provider";
export default class ResponseError extends Error {
    __proto__: ResponseError;
    private readonly response;
    constructor(message: string, response: Response | GoogleMapsResponse | MapboxResponse | NominatimResponse | OpenCageResponse);
    getResponse(): Response | GoogleMapsResponse | MapboxResponse | NominatimResponse | OpenCageResponse;
}
//# sourceMappingURL=ResponseError.d.ts.map