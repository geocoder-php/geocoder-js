import { GeocodeQuery, GeocodeQueryObject } from "query";
import { Box } from "types";

export interface NominatimGeocodeQueryObject extends GeocodeQueryObject {
  readonly countryCodes?: string[];
  readonly excludePlaceIds?: number[];
  readonly viewBox?: Box;
  readonly bounded?: boolean;
}

export default class NominatimGeocodeQuery extends GeocodeQuery {
  private readonly countryCodes?: string[];

  private readonly excludePlaceIds?: number[];

  private readonly viewBox?: Box;

  private readonly bounded?: boolean;

  protected constructor({
    countryCodes,
    excludePlaceIds,
    viewBox,
    bounded,
    ...geocodeQueryObject
  }: NominatimGeocodeQueryObject) {
    super(geocodeQueryObject);
    this.countryCodes = countryCodes;
    this.excludePlaceIds = excludePlaceIds;
    if (viewBox && viewBox.length !== 4) {
      throw new Error('The "viewBox" parameter must be 4 numbers.');
    }
    this.viewBox = viewBox;
    if (bounded && !viewBox) {
      throw new Error(
        'The "bounded" parameter can only be used with the "viewBox" parameter.'
      );
    }
    this.bounded = bounded;
  }

  public static create(
    object: NominatimGeocodeQueryObject
  ): NominatimGeocodeQuery {
    return new this(object);
  }

  public toObject(): NominatimGeocodeQueryObject {
    return {
      ...super.toObject(),
      countryCodes: this.countryCodes,
      excludePlaceIds: this.excludePlaceIds,
      viewBox: this.viewBox,
      bounded: this.bounded,
    };
  }

  public withCountryCodes(countryCodes: string[]): NominatimGeocodeQuery {
    return new NominatimGeocodeQuery({ ...this.toObject(), countryCodes });
  }

  public getCountryCodes(): undefined | string[] {
    return this.countryCodes;
  }

  public withExcludePlaceIds(excludePlaceIds: number[]): NominatimGeocodeQuery {
    return new NominatimGeocodeQuery({ ...this.toObject(), excludePlaceIds });
  }

  public getExcludePlaceIds(): undefined | number[] {
    return this.excludePlaceIds;
  }

  public withViewBox(viewBox: Box): NominatimGeocodeQuery {
    return new NominatimGeocodeQuery({ ...this.toObject(), viewBox });
  }

  public getViewBox(): undefined | Box {
    return this.viewBox;
  }

  public withBounded(bounded: boolean): NominatimGeocodeQuery {
    return new NominatimGeocodeQuery({ ...this.toObject(), bounded });
  }

  public getBounded(): undefined | boolean {
    return this.bounded;
  }
}
