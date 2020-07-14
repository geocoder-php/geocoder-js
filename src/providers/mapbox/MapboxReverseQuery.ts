import { ReverseQuery, ReverseQueryObject } from "query";

export interface MapboxReverseQueryObject extends ReverseQueryObject {
  readonly locationTypes?: string[];
}

export default class MapboxReverseQuery extends ReverseQuery {
  private readonly locationTypes?: string[];

  protected constructor({
    locationTypes,
    ...reverseQueryObject
  }: MapboxReverseQueryObject) {
    super(reverseQueryObject);
    this.locationTypes = locationTypes;
  }

  public static create(object: MapboxReverseQueryObject): MapboxReverseQuery {
    return new this(object);
  }

  public toObject(): MapboxReverseQueryObject {
    return {
      ...super.toObject(),
      locationTypes: this.locationTypes,
    };
  }

  public withLocationTypes(locationTypes: string[]): MapboxReverseQuery {
    return new MapboxReverseQuery({ ...this.toObject(), locationTypes });
  }

  public getLocationTypes(): undefined | string[] {
    return this.locationTypes;
  }
}
