export default class ResponseError extends Error {
    __proto__: ResponseError;
    private readonly response;
    constructor(message: string, response: Response);
    getResponse(): Response;
}
//# sourceMappingURL=ResponseError.d.ts.map