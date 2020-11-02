import { GeocodeQuery, GeocodeQueryObject } from "query";
import { Coordinates } from "types";

interface YandexSpan {
  spanLatitude: string;
  spanLongitude: string;
}

export interface YandexGeocodeQueryObject extends GeocodeQueryObject {
  readonly bounded?: boolean;
  readonly proximity?: Coordinates;
  readonly span?: YandexSpan;
  readonly skip?: number;
}

export default class YandexGeocodeQuery extends GeocodeQuery {
  private readonly bounded?: boolean;

  private readonly proximity?: Coordinates;

  private readonly span?: YandexSpan;

  private readonly skip?: number;

  protected constructor({
    bounded,
    proximity,
    span,
    skip,
    bounds,
    ...geocodeQueryObject
  }: YandexGeocodeQueryObject) {
    super({ bounds, ...geocodeQueryObject });
    if (bounded && (!bounds || !proximity)) {
      throw new Error(
        'The "bounded" parameter can only be used with the "bounds" or "proximity" parameter.'
      );
    }
    this.bounded = bounded;
    if (proximity && (!proximity.latitude || !proximity.longitude)) {
      throw new Error(
        'The "proximity" parameter must be an object with the keys: "latitude", "longitude".'
      );
    }
    this.proximity = proximity;
    if (span && !proximity) {
      throw new Error(
        'The "proximity" parameter must be defined to use the "span" parameter.'
      );
    }
    if (span && (!span.spanLatitude || !span.spanLongitude)) {
      throw new Error(
        'The "span" parameter must be an object with the keys: "spanLatitude", "spanLongitude".'
      );
    }
    this.span = span;
    if (bounds && proximity) {
      throw new Error(
        'The "bounds" and "proximity" parameters cannot be used at the same time.'
      );
    }
    this.skip = skip;
  }

  public static create(object: YandexGeocodeQueryObject): YandexGeocodeQuery {
    return new this(object);
  }

  public toObject(): YandexGeocodeQueryObject {
    return {
      ...super.toObject(),
      bounded: this.bounded,
      proximity: this.proximity,
      span: this.span,
      skip: this.skip,
    };
  }

  public withBounded(bounded: boolean): YandexGeocodeQuery {
    return new YandexGeocodeQuery({ ...this.toObject(), bounded });
  }

  public getBounded(): undefined | boolean {
    return this.bounded;
  }

  public withProximity(proximity: Coordinates): YandexGeocodeQuery {
    return new YandexGeocodeQuery({ ...this.toObject(), proximity });
  }

  public getProximity(): undefined | Coordinates {
    return this.proximity;
  }

  public withSpan(span: YandexSpan): YandexGeocodeQuery {
    return new YandexGeocodeQuery({ ...this.toObject(), span });
  }

  public getSpan(): undefined | YandexSpan {
    return this.span;
  }

  public withSkip(skip: number): YandexGeocodeQuery {
    return new YandexGeocodeQuery({ ...this.toObject(), skip });
  }

  public getSkip(): undefined | number {
    return this.skip;
  }
}
