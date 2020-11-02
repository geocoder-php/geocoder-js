import { ReverseQuery, ReverseQueryObject } from "query";

type ReverseMode = "distance" | "score";

export interface MapboxReverseQueryObject extends ReverseQueryObject {
  readonly countryCodes?: string[];
  readonly reverseMode?: ReverseMode;
  readonly locationTypes?: string[];
}

export default class MapboxReverseQuery extends ReverseQuery {
  private readonly countryCodes?: string[];

  private readonly reverseMode?: ReverseMode;

  private readonly locationTypes?: string[];

  protected constructor({
    countryCodes,
    reverseMode,
    locationTypes,
    ...reverseQueryObject
  }: MapboxReverseQueryObject) {
    super(reverseQueryObject);
    this.countryCodes = countryCodes;
    this.reverseMode = reverseMode;
    this.locationTypes = locationTypes;
  }

  public static create(object: MapboxReverseQueryObject): MapboxReverseQuery {
    return new this(object);
  }

  public toObject(): MapboxReverseQueryObject {
    return {
      ...super.toObject(),
      countryCodes: this.countryCodes,
      reverseMode: this.reverseMode,
      locationTypes: this.locationTypes,
    };
  }

  public withCountryCodes(countryCodes: string[]): MapboxReverseQuery {
    return new MapboxReverseQuery({ ...this.toObject(), countryCodes });
  }

  public getCountryCodes(): undefined | string[] {
    return this.countryCodes;
  }

  public withReverseMode(reverseMode: ReverseMode): MapboxReverseQuery {
    return new MapboxReverseQuery({ ...this.toObject(), reverseMode });
  }

  public getReverseMode(): undefined | ReverseMode {
    return this.reverseMode;
  }

  public withLocationTypes(locationTypes: string[]): MapboxReverseQuery {
    return new MapboxReverseQuery({ ...this.toObject(), locationTypes });
  }

  public getLocationTypes(): undefined | string[] {
    return this.locationTypes;
  }
}
