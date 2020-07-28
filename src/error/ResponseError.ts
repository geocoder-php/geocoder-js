export default class ResponseError extends Error {
  public __proto__: ResponseError;

  private readonly response: Response;

  public constructor(message: string, response: Response) {
    super(message);
    this.name = "ResponseError";
    this.response = response;

    // eslint-disable-next-line no-proto
    this.__proto__ = ResponseError.prototype;
  }

  public getResponse(): Response {
    return this.response;
  }
}
