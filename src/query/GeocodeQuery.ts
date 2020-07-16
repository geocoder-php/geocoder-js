import { DEFAULT_RESULT_LIMIT } from "providers/ProviderInterface";
import { PartialSome } from "types";
import { Bounds } from "index";

type GeocodeQueryObjectCreate = PartialSome<GeocodeQueryObject, "limit">;

export interface GeocodeQueryObject {
  readonly text: string;
  readonly south?: number | string;
  readonly west?: number | string;
  readonly north?: number | string;
  readonly east?: number | string;
  readonly locale?: string;
  readonly limit?: number;
}

export default class GeocodeQuery {
  private readonly text: string;

  private readonly south?: number | string;

  private readonly west?: number | string;

  private readonly north?: number | string;

  private readonly east?: number | string;

  private readonly locale?: string;

  private readonly limit: number = DEFAULT_RESULT_LIMIT;

  protected constructor({
    text,
    south,
    west,
    north,
    east,
    locale,
    limit = DEFAULT_RESULT_LIMIT,
  }: GeocodeQueryObjectCreate) {
    this.text = text;
    this.south = south;
    this.west = west;
    this.north = north;
    this.east = east;
    this.locale = locale;
    this.limit = limit;
  }

  public static create(object: GeocodeQueryObjectCreate): GeocodeQuery {
    return new this(object);
  }

  public toObject(): GeocodeQueryObject {
    return {
      text: this.text,
      south: this.south,
      west: this.west,
      north: this.north,
      east: this.east,
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

  public withBounds(
    south?: number,
    west?: number,
    north?: number,
    east?: number
  ): GeocodeQuery {
    return (<typeof GeocodeQuery>this.constructor).create({
      ...this.toObject(),
      south,
      west,
      north,
      east,
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

  public getText(): string {
    return this.text;
  }

  public getBounds(): undefined | Bounds {
    if (!this.south || !this.west || !this.north || !this.east) {
      return undefined;
    }

    return {
      south: this.south,
      west: this.west,
      north: this.north,
      east: this.east,
    };
  }

  public getLocale(): undefined | string {
    return this.locale;
  }

  public getLimit(): number {
    return this.limit;
  }
}
