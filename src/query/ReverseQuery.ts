import { DEFAULT_RESULT_LIMIT } from "provider";
import { Coordinates } from "types";

export interface ReverseQueryObject {
  readonly coordinates: Coordinates;
  readonly locale?: string;
  readonly limit?: number;
}

export default class ReverseQuery {
  private readonly coordinates: Coordinates;

  private readonly locale?: string;

  private readonly limit: number = DEFAULT_RESULT_LIMIT;

  protected constructor({
    coordinates,
    locale,
    limit = DEFAULT_RESULT_LIMIT,
  }: ReverseQueryObject) {
    if (coordinates && (!coordinates.latitude || !coordinates.longitude)) {
      throw new Error(
        'The "coordinates" parameter must be an object with the keys: "latitude", "longitude".'
      );
    }
    this.coordinates = coordinates;
    this.locale = locale;
    this.limit = limit;
  }

  public static create(object: ReverseQueryObject): ReverseQuery {
    return new this(object);
  }

  public toObject(): ReverseQueryObject {
    return {
      coordinates: this.coordinates,
      locale: this.locale,
      limit: this.limit,
    };
  }

  public withCoordinates(coordinates: Coordinates): ReverseQuery {
    return (<typeof ReverseQuery>this.constructor).create({
      ...this.toObject(),
      coordinates,
    });
  }

  public withLocale(locale: string): ReverseQuery {
    return (<typeof ReverseQuery>this.constructor).create({
      ...this.toObject(),
      locale,
    });
  }

  public withLimit(limit: number): ReverseQuery {
    return (<typeof ReverseQuery>this.constructor).create({
      ...this.toObject(),
      limit,
    });
  }

  public getCoordinates(): Coordinates {
    return this.coordinates;
  }

  public getLocale(): undefined | string {
    return this.locale;
  }

  public getLimit(): number {
    return this.limit;
  }
}
