import ProviderFactory, {
  GeocoderProviderFactoryOptions,
} from "GeocoderProviderFactory";
import { ProviderInterface } from "providers";

export default class GeocoderJS {
  public version = "0.1.0";

  public static createGeocoder(
    options: string | GeocoderProviderFactoryOptions
  ): ProviderInterface | undefined {
    return ProviderFactory.createProvider(options);
  }
}
