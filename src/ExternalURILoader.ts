import fetch from "cross-fetch";

export interface ExternalLoaderInterface {
  setOptions(options: ExternalLoaderOptions): void;
  executeRequest(
    params: ExternalLoaderParams,
    callback: ResponseCallback,
    headers?: ExternalLoaderHeaders
  ): void;
}

export interface ExternalLoaderOptions {
  readonly protocol: string;
  readonly host?: string;
  readonly pathname?: string;
}

export interface ExternalLoaderParams {
  [param: string]: string | undefined;
  JSONPCallback?: string;
}

export interface ExternalLoaderHeaders {
  [header: string]: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ResponseCallback = (response: any) => void;

const defaultOptions: ExternalLoaderOptions = {
  protocol: "http",
};

/**
 * Load data from external geocoding engines.
 */
export default class ExternalURILoader implements ExternalLoaderInterface {
  private options: ExternalLoaderOptions = defaultOptions;

  public constructor(options: ExternalLoaderOptions = defaultOptions) {
    this.setOptions(options);
  }

  public setOptions(options: ExternalLoaderOptions): void {
    this.options = { ...defaultOptions, ...options };
  }

  public executeRequest(
    params: ExternalLoaderParams,
    callback: ResponseCallback,
    externalLoaderHeaders?: ExternalLoaderHeaders
  ): void {
    if (!this.options.host) {
      throw new Error("A host is required for the external URI loader.");
    }
    if (!this.options.pathname) {
      throw new Error("A pathname is required for the external URI loader.");
    }

    const requestUrl = new URL(
      `${this.options.protocol}://${this.options.host}/${this.options.pathname}`
    );

    const { JSONPCallback: jsonpCallback, ...requestParams } = params;

    // eslint-disable-next-line no-restricted-syntax
    for (const paramKey in requestParams) {
      if (
        Object.prototype.hasOwnProperty.call(requestParams, paramKey) &&
        requestParams[paramKey] !== undefined
      ) {
        requestUrl.searchParams.append(paramKey, requestParams[paramKey] ?? "");
      }
    }

    if (jsonpCallback) {
      ExternalURILoader.runJsonpCallback(requestUrl, callback, jsonpCallback);
      return;
    }

    const headers = externalLoaderHeaders || {};
    fetch(requestUrl.toString(), {
      headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Received HTTP status code ${response.status} when attempting geocoding request.`
          );
        }
        return response.json();
      })
      .then(
        (data) => callback(data),
        () => {
          throw new Error(
            "Received invalid JSON data when attempting geocoding request."
          );
        }
      )
      .catch((error) => {
        console.log(error);
        callback(null);
      });
  }

  private static runJsonpCallback(
    requestUrl: URL,
    callback: ResponseCallback,
    jsonpCallback: string
  ): void {
    if (typeof window === "undefined") {
      console.error(
        "JSONPCallback parameter can only be used in a browser environment."
      );

      return;
    }

    requestUrl.searchParams.append(
      jsonpCallback,
      ExternalURILoader.generateJsonpCallback(callback)
    );

    // Create a new script element.
    const scriptElement = document.createElement("script");

    // Set its source to the JSONP API.
    scriptElement.src = requestUrl.toString();

    // Stick the script element in the page <head>.
    document.getElementsByTagName("head")[0].appendChild(scriptElement);
  }

  /**
   * Generates randomly-named function to use as a callback for JSONP requests.
   * @see https://github.com/OscarGodson/JSONP
   */
  private static generateJsonpCallback(callback: ResponseCallback): string {
    // Use timestamp + a random factor to account for a lot of requests in a short time.
    // e.g. jsonp1394571775161.
    const timestamp = Date.now();
    const generatedFunction = `jsonp${Math.round(
      timestamp + Math.random() * 1000001
    )}`;

    // Generate the temp JSONP function using the name above.
    // First, call the function the user defined in the callback param [callback(json)].
    // Then delete the generated function from the window [delete window[generatedFunction]].
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (<any>window)[generatedFunction] = (json: string) => {
      callback(json);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (<any>window)[generatedFunction];
    };

    return generatedFunction;
  }
}
