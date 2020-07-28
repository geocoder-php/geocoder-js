import { ReverseQuery, ReverseQueryObject } from "query";

export interface NominatimReverseQueryObject extends ReverseQueryObject {
  readonly zoom?: number;
}

export default class NominatimReverseQuery extends ReverseQuery {
  private readonly zoom?: number;

  protected constructor({
    zoom,
    ...reverseQueryObject
  }: NominatimReverseQueryObject) {
    super(reverseQueryObject);
    this.zoom = zoom;
  }

  public static create(
    object: NominatimReverseQueryObject
  ): NominatimReverseQuery {
    return new this(object);
  }

  public toObject(): NominatimReverseQueryObject {
    return {
      ...super.toObject(),
      zoom: this.zoom,
    };
  }

  public withZoom(zoom: number): NominatimReverseQuery {
    return new NominatimReverseQuery({ ...this.toObject(), zoom });
  }

  public getZoom(): undefined | number {
    return this.zoom;
  }
}
