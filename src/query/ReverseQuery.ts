import { DEFAULT_RESULT_LIMIT } from "provider";
import { Coordinates } from "index";

export interface ReverseQueryObject {
  readonly latitude: number | string;
  readonly longitude: number | string;
  readonly locale?: string;
  readonly limit?: number;
}

export default class ReverseQuery {
  private readonly latitude: number | string;

  private readonly longitude: number | string;

  private readonly locale?: string;

  private readonly limit: number = DEFAULT_RESULT_LIMIT;

  protected constructor({
    latitude,
    longitude,
    locale,
    limit = DEFAULT_RESULT_LIMIT,
  }: ReverseQueryObject) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.locale = locale;
    this.limit = limit;
  }

  public static create(object: ReverseQueryObject): ReverseQuery {
    return new this(object);
  }

  public toObject(): ReverseQueryObject {
    return {
      latitude: this.latitude,
      longitude: this.longitude,
      locale: this.locale,
      limit: this.limit,
    };
  }

  public withCoordinates(latitude: number, longitude: number): ReverseQuery {
    return (<typeof ReverseQuery>this.constructor).create({
      ...this.toObject(),
      latitude,
      longitude,
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
    return { latitude: this.latitude, longitude: this.longitude };
  }

  public getLocale(): undefined | string {
    return this.locale;
  }

  public getLimit(): number {
    return this.limit;
  }
}
