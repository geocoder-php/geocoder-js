import { GeocodeQuery, GeocodeQueryObject } from "query";

export interface MapboxGeocodeQueryObject extends GeocodeQueryObject {
  readonly locationTypes?: string[];
}

export default class MapboxGeocodeQuery extends GeocodeQuery {
  private readonly locationTypes?: string[];

  protected constructor({
    locationTypes,
    ...geocodeQueryObject
  }: MapboxGeocodeQueryObject) {
    super(geocodeQueryObject);
    this.locationTypes = locationTypes;
  }

  public static create(object: MapboxGeocodeQueryObject): MapboxGeocodeQuery {
    return new this(object);
  }

  public toObject(): MapboxGeocodeQueryObject {
    return {
      ...super.toObject(),
      locationTypes: this.locationTypes,
    };
  }

  public withLocationTypes(locationTypes: string[]): MapboxGeocodeQuery {
    return new MapboxGeocodeQuery({ ...this.toObject(), locationTypes });
  }

  public getLocationTypes(): undefined | string[] {
    return this.locationTypes;
  }
}
