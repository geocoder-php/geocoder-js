import { ReverseQuery, ReverseQueryObject } from "query";
import { YandexKind } from "provider";

export interface YandexReverseQueryObject extends ReverseQueryObject {
  readonly locationTypes?: YandexKind[];
  readonly skip?: number;
}

export default class YandexReverseQuery extends ReverseQuery {
  private readonly locationTypes?: YandexKind[];

  private readonly skip?: number;

  protected constructor({
    locationTypes,
    skip,
    ...reverseQueryObject
  }: YandexReverseQueryObject) {
    super(reverseQueryObject);
    if (locationTypes && locationTypes.length > 1) {
      throw new Error(
        'The "locationTypes" parameter must contain only one location type.'
      );
    }
    this.locationTypes = locationTypes;
    this.skip = skip;
  }

  public static create(object: YandexReverseQueryObject): YandexReverseQuery {
    return new this(object);
  }

  public toObject(): YandexReverseQueryObject {
    return {
      ...super.toObject(),
      locationTypes: this.locationTypes,
      skip: this.skip,
    };
  }

  public withLocationTypes(locationTypes: YandexKind[]): YandexReverseQuery {
    return new YandexReverseQuery({ ...this.toObject(), locationTypes });
  }

  public getLocationTypes(): undefined | YandexKind[] {
    return this.locationTypes;
  }

  public withSkip(skip: number): YandexReverseQuery {
    return new YandexReverseQuery({ ...this.toObject(), skip });
  }

  public getSkip(): undefined | number {
    return this.skip;
  }
}
