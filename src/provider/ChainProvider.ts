import {
  ExternalLoaderBody,
  ExternalLoaderHeaders,
  ExternalLoaderParams,
} from "ExternalLoader";
import Geocoded from "Geocoded";
import {
  ErrorCallback,
  GeocodedResultsCallback,
  ProviderHelpers,
  ProviderInterface,
  ProviderOptionsInterface,
  defaultProviderOptions,
} from "provider";
import {
  GeocodeQuery,
  GeocodeQueryObject,
  ReverseQuery,
  ReverseQueryObject,
} from "query";

export interface ChainProviderOptionsInterface
  extends ProviderOptionsInterface {
  readonly providers: ProviderInterface<Geocoded>[];
  readonly parallelize?: boolean;
  readonly first?: boolean;
}

export const defaultChainProviderOptions = {
  ...defaultProviderOptions,
  providers: [],
};

type ChainGeocodedResultsCallback = GeocodedResultsCallback<Geocoded>;

export default class ChainProvider implements ProviderInterface<Geocoded> {
  private options: ChainProviderOptionsInterface;

  public constructor(
    options: ChainProviderOptionsInterface = defaultChainProviderOptions
  ) {
    this.options = options;
  }

  public geocode(
    query: string | GeocodeQuery | GeocodeQueryObject,
    callback: ChainGeocodedResultsCallback,
    errorCallback?: ErrorCallback
  ): void {
    if (this.options.parallelize || this.options.first) {
      this.geocodeAllProviders(query, callback, errorCallback);
      return;
    }

    this.geocodeNextProvider(
      this.options.providers,
      query,
      callback,
      errorCallback
    );
  }

  public geodecode(
    latitudeOrQuery: number | string | ReverseQuery | ReverseQueryObject,
    longitudeOrCallback: number | string | ChainGeocodedResultsCallback,
    callbackOrErrorCallback?: ChainGeocodedResultsCallback | ErrorCallback,
    errorCallback?: ErrorCallback
  ): void {
    const reverseQuery = ProviderHelpers.getReverseQueryFromParameters(
      latitudeOrQuery,
      longitudeOrCallback
    );
    const reverseCallback = ProviderHelpers.getCallbackFromParameters(
      longitudeOrCallback,
      callbackOrErrorCallback
    );
    const reverseErrorCallback = ProviderHelpers.getErrorCallbackFromParameters(
      longitudeOrCallback,
      callbackOrErrorCallback,
      errorCallback
    );

    if (this.options.parallelize || this.options.first) {
      this.geodecodeAllProviders(
        reverseQuery,
        reverseCallback,
        reverseErrorCallback
      );
      return;
    }

    this.geodecodeNextProvider(
      this.options.providers,
      reverseQuery,
      reverseCallback,
      reverseErrorCallback
    );
  }

  private geocodeNextProvider(
    providers: ProviderInterface<Geocoded>[],
    query: string | GeocodeQuery | GeocodeQueryObject,
    callback: ChainGeocodedResultsCallback,
    errorCallback?: ErrorCallback
  ): void {
    const [provider, ...nextProviders] = providers;
    const resultCallback: ChainGeocodedResultsCallback = (results) => {
      if (results.length > 0) {
        callback(results);
        return;
      }
      this.geocodeNextProvider(nextProviders, query, callback, errorCallback);
    };
    const resultErrorCallback: ErrorCallback = (responseError) => {
      if (errorCallback) {
        errorCallback(responseError);
      }
      if (!errorCallback) {
        // eslint-disable-next-line no-console
        console.error(
          `An error has occurred when geocoding with the provider ${provider.constructor.name}`,
          responseError
        );
      }
      resultCallback([]);
    };

    provider.geocode(query, resultCallback, resultErrorCallback);
  }

  private geodecodeNextProvider(
    providers: ProviderInterface<Geocoded>[],
    reverseQuery: ReverseQuery,
    callback: ChainGeocodedResultsCallback,
    errorCallback?: ErrorCallback
  ): void {
    const [provider, ...nextProviders] = providers;
    const resultCallback: ChainGeocodedResultsCallback = (results) => {
      if (results.length > 0) {
        callback(results);
        return;
      }
      this.geodecodeNextProvider(
        nextProviders,
        reverseQuery,
        callback,
        errorCallback
      );
    };
    const resultErrorCallback: ErrorCallback = (responseError) => {
      if (errorCallback) {
        errorCallback(responseError);
      }
      if (!errorCallback) {
        // eslint-disable-next-line no-console
        console.error(
          `An error has occurred when geodecoding with the provider ${provider.constructor.name}`,
          responseError
        );
      }
      resultCallback([]);
    };

    provider.geodecode(reverseQuery, resultCallback, resultErrorCallback);
  }

  private geocodeAllProviders(
    query: string | GeocodeQuery | GeocodeQueryObject,
    callback: ChainGeocodedResultsCallback,
    errorCallback?: ErrorCallback
  ): void {
    const providerResults: Map<string, Geocoded[]> = new Map();
    let callbackCalled = false;
    const getProviderResult = () =>
      this.options.providers.reduce((result, provider) => {
        let providerResult = result;
        if (undefined === providerResult && this.options.first) {
          providerResult = [];
        }
        if (undefined === providerResult) {
          return undefined;
        }
        if (providerResult.length > 0) {
          return providerResult;
        }

        return providerResults.get(provider.constructor.name);
      }, <undefined | Geocoded[]>[]);
    const resultProviderCallback: (
      providerName: string
    ) => ChainGeocodedResultsCallback = (providerName) => (results) => {
      providerResults.set(providerName, results);
      const providerResult = getProviderResult();
      if (!callbackCalled && providerResult) {
        callback(providerResult);
        callbackCalled = true;
      }
    };
    const resultProviderErrorCallback: (
      providerName: string
    ) => ErrorCallback = (providerName) => (responseError) => {
      if (errorCallback) {
        errorCallback(responseError);
      }
      if (!errorCallback) {
        // eslint-disable-next-line no-console
        console.error(
          `An error has occurred when geocoding with the provider ${providerName}`,
          responseError
        );
      }
      resultProviderCallback(providerName)([]);
    };

    this.options.providers.forEach((provider) => {
      const providerName = provider.constructor.name;
      provider.geocode(
        query,
        resultProviderCallback(providerName),
        resultProviderErrorCallback(providerName)
      );
    });
  }

  private geodecodeAllProviders(
    reverseQuery: ReverseQuery,
    callback: ChainGeocodedResultsCallback,
    errorCallback?: ErrorCallback
  ): void {
    const providerResults: Map<string, Geocoded[]> = new Map();
    let callbackCalled = false;
    const getProviderResult = () =>
      this.options.providers.reduce((result, provider) => {
        let providerResult = result;
        if (undefined === providerResult && this.options.first) {
          providerResult = [];
        }
        if (undefined === providerResult) {
          return undefined;
        }
        if (providerResult.length > 0) {
          return providerResult;
        }

        return providerResults.get(provider.constructor.name);
      }, <undefined | Geocoded[]>[]);
    const resultProviderCallback: (
      providerName: string
    ) => ChainGeocodedResultsCallback = (providerName) => (results) => {
      providerResults.set(providerName, results);
      const providerResult = getProviderResult();
      if (!callbackCalled && providerResult) {
        callback(providerResult);
        callbackCalled = true;
      }
    };
    const resultProviderErrorCallback: (
      providerName: string
    ) => ErrorCallback = (providerName) => (responseError) => {
      if (errorCallback) {
        errorCallback(responseError);
      }
      if (!errorCallback) {
        // eslint-disable-next-line no-console
        console.error(
          `An error has occurred when geodecoding with the provider ${providerName}`,
          responseError
        );
      }
      resultProviderCallback(providerName)([]);
    };

    this.options.providers.forEach((provider) => {
      const providerName = provider.constructor.name;
      provider.geodecode(
        reverseQuery,
        resultProviderCallback(providerName),
        resultProviderErrorCallback(providerName)
      );
    });
  }

  // eslint-disable-next-line class-methods-use-this
  public executeRequest(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: ExternalLoaderParams,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    callback: ChainGeocodedResultsCallback,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    headers?: ExternalLoaderHeaders,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    body?: ExternalLoaderBody,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    errorCallback?: ErrorCallback
  ): void {
    throw new Error(
      "executeRequest cannot be called directly from the chain provider."
    );
  }
}
