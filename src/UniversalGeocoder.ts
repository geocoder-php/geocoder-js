import ProviderFactory, {
  GeocoderProviderByOptionsType,
  GeocoderProviderFactoryOptions,
} from "GeocoderProviderFactory";

export default class UniversalGeocoder {
  public version = "0.1.0";

  public static createGeocoder<O extends GeocoderProviderFactoryOptions>(
    options: string | O
  ): GeocoderProviderByOptionsType<O> | undefined {
    return ProviderFactory.createProvider(options);
  }
}
