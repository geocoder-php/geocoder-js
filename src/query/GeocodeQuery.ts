import { DEFAULT_RESULT_LIMIT } from "provider";
import { BoundingBox } from "types";

export interface GeocodeQueryObject {
  readonly text?: string;
  readonly ip?: string;
  readonly bounds?: BoundingBox;
  readonly locale?: string;
  readonly limit?: number;
}

export default class GeocodeQuery {
  private readonly text?: string;

  private readonly ip?: string;

  private readonly bounds?: BoundingBox;

  private readonly locale?: string;

  private readonly limit: number = DEFAULT_RESULT_LIMIT;

  protected constructor({
    text,
    ip,
    bounds,
    locale,
    limit = DEFAULT_RESULT_LIMIT,
  }: GeocodeQueryObject) {
    this.text = text;
    this.ip = ip;
    if (!text && !ip) {
      throw new Error('Either "text" or "ip" parameter is required.');
    }
    if (
      bounds &&
      (!bounds.latitudeSW ||
        !bounds.longitudeSW ||
        !bounds.latitudeNE ||
        !bounds.longitudeNE)
    ) {
      throw new Error(
        'The "bounds" parameter must be an object with the keys: "latitudeSW", "longitudeSW", "latitudeNE", "longitudeNE".'
      );
    }
    this.bounds = bounds;
    this.locale = locale;
    this.limit = limit;
  }

  public static create(object: GeocodeQueryObject): GeocodeQuery {
    return new this(object);
  }

  public toObject(): GeocodeQueryObject {
    return {
      text: this.text,
      ip: this.ip,
      bounds: this.bounds,
      locale: this.locale,
      limit: this.limit,
    };
  }

  public withText(text: string): GeocodeQuery {
    return (<typeof GeocodeQuery>this.constructor).create({
      ...this.toObject(),
      text,
    });
  }

  public withIp(ip: string): GeocodeQuery {
    return (<typeof GeocodeQuery>this.constructor).create({
      ...this.toObject(),
      ip,
    });
  }

  public withBounds(bounds: BoundingBox): GeocodeQuery {
    return (<typeof GeocodeQuery>this.constructor).create({
      ...this.toObject(),
      bounds,
    });
  }

  public withLocale(locale: string): GeocodeQuery {
    return (<typeof GeocodeQuery>this.constructor).create({
      ...this.toObject(),
      locale,
    });
  }

  public withLimit(limit: number): GeocodeQuery {
    return (<typeof GeocodeQuery>this.constructor).create({
      ...this.toObject(),
      limit,
    });
  }

  public getText(): undefined | string {
    return this.text;
  }

  public getIp(): undefined | string {
    return this.ip;
  }

  public getBounds(): undefined | BoundingBox {
    return this.bounds;
  }

  public getLocale(): undefined | string {
    return this.locale;
  }

  public getLimit(): number {
    return this.limit;
  }
}
