import Geocoded, { GeocodedObject } from "Geocoded";

export interface MapboxGeocodedObject extends GeocodedObject {
  readonly resultType?: string[];
}

export default class MapboxGeocoded extends Geocoded {
  private readonly resultType?: string[];

  protected constructor({
    resultType,
    ...geocodedObject
  }: MapboxGeocodedObject) {
    super(geocodedObject);
    this.resultType = resultType;
  }

  public static create(object: MapboxGeocodedObject): MapboxGeocoded {
    return new this(object);
  }

  public toObject(): MapboxGeocodedObject {
    return {
      ...super.toObject(),
      resultType: this.resultType,
    };
  }

  public withResultType(resultType: string[]): MapboxGeocoded {
    return new MapboxGeocoded({
      ...this.toObject(),
      resultType,
    });
  }

  public getResultType(): undefined | string[] {
    return this.resultType;
  }
}
