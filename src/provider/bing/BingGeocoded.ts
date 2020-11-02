import Geocoded, { GeocodedObject } from "Geocoded";
import { BingPrecision } from "provider";

export interface BingGeocodedObject extends GeocodedObject {
  readonly attribution?: string;
  readonly precision?: BingPrecision;
}

export default class BingGeocoded extends Geocoded {
  private readonly attribution?: string;

  private readonly precision?: BingPrecision;

  protected constructor({
    attribution,
    precision,
    ...geocodedObject
  }: BingGeocodedObject) {
    super(geocodedObject);
    this.attribution = attribution;
    this.precision = precision;
  }

  public static create(object: BingGeocodedObject): BingGeocoded {
    return new this(object);
  }

  public toObject(): BingGeocodedObject {
    return {
      ...super.toObject(),
      attribution: this.attribution,
      precision: this.precision,
    };
  }

  public withAttribution(attribution: string): BingGeocoded {
    return new BingGeocoded({
      ...this.toObject(),
      attribution,
    });
  }

  public getAttribution(): undefined | string {
    return this.attribution;
  }

  public withPrecision(precision: BingPrecision): BingGeocoded {
    return new BingGeocoded({
      ...this.toObject(),
      precision,
    });
  }

  public getPrecision(): undefined | BingPrecision {
    return this.precision;
  }
}
