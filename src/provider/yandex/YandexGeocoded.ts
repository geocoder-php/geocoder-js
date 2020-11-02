import Geocoded, { GeocodedObject } from "Geocoded";
import { YandexKind, YandexPrecision } from "provider";

export interface YandexGeocodedObject extends GeocodedObject {
  readonly locationType?: YandexKind;
  readonly precision?: YandexPrecision;
}

export default class YandexGeocoded extends Geocoded {
  private readonly locationType?: YandexKind;

  private readonly precision?: YandexPrecision;

  protected constructor({
    locationType,
    precision,
    ...geocodedObject
  }: YandexGeocodedObject) {
    super(geocodedObject);
    this.locationType = locationType;
    this.precision = precision;
  }

  public static create(object: YandexGeocodedObject): YandexGeocoded {
    return new this(object);
  }

  public toObject(): YandexGeocodedObject {
    return {
      ...super.toObject(),
      locationType: this.locationType,
      precision: this.precision,
    };
  }

  public withLocationType(locationType: YandexKind): YandexGeocoded {
    return new YandexGeocoded({
      ...this.toObject(),
      locationType,
    });
  }

  public getLocationType(): undefined | YandexKind {
    return this.locationType;
  }

  public withPrecision(precision: YandexPrecision): YandexGeocoded {
    return new YandexGeocoded({
      ...this.toObject(),
      precision,
    });
  }

  public getPrecision(): undefined | YandexPrecision {
    return this.precision;
  }
}
