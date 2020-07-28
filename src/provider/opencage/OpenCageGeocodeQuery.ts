import { GeocodeQuery, GeocodeQueryObject } from "query";
import { Coordinates } from "index";

export interface OpenCageGeocodeQueryObject extends GeocodeQueryObject {
  readonly countryCodes?: string[];
  readonly proximity?: Coordinates;
  readonly minConfidence?: number;
  readonly noRecord?: boolean;
}

export default class OpenCageGeocodeQuery extends GeocodeQuery {
  private readonly countryCodes?: string[];

  private readonly proximity?: Coordinates;

  private readonly minConfidence?: number;

  private readonly noRecord?: boolean;

  protected constructor({
    countryCodes,
    proximity,
    minConfidence,
    noRecord,
    ...geocodeQueryObject
  }: OpenCageGeocodeQueryObject) {
    super(geocodeQueryObject);
    this.countryCodes = countryCodes;
    this.proximity = proximity;
    if (
      minConfidence &&
      (minConfidence.toString() !==
        parseInt(minConfidence.toString(), 10).toString() ||
        minConfidence < 1 ||
        minConfidence > 10)
    ) {
      throw new Error(
        'The "minConfidence" parameter must be an integer from 1 to 10.'
      );
    }
    this.minConfidence = minConfidence;
    this.noRecord = noRecord;
  }

  public static create(
    object: OpenCageGeocodeQueryObject
  ): OpenCageGeocodeQuery {
    return new this(object);
  }

  public toObject(): OpenCageGeocodeQueryObject {
    return {
      ...super.toObject(),
      countryCodes: this.countryCodes,
      proximity: this.proximity,
      minConfidence: this.minConfidence,
      noRecord: this.noRecord,
    };
  }

  public withCountryCodes(countryCodes: string[]): OpenCageGeocodeQuery {
    return new OpenCageGeocodeQuery({ ...this.toObject(), countryCodes });
  }

  public getCountryCodes(): undefined | string[] {
    return this.countryCodes;
  }

  public withProximity(proximity: Coordinates): OpenCageGeocodeQuery {
    return new OpenCageGeocodeQuery({ ...this.toObject(), proximity });
  }

  public getProximity(): undefined | Coordinates {
    return this.proximity;
  }

  public withMinConfidence(minConfidence: number): OpenCageGeocodeQuery {
    return new OpenCageGeocodeQuery({ ...this.toObject(), minConfidence });
  }

  public getMinConfidence(): undefined | number {
    return this.minConfidence;
  }

  public withNoRecord(noRecord: boolean): OpenCageGeocodeQuery {
    return new OpenCageGeocodeQuery({ ...this.toObject(), noRecord });
  }

  public getNoRecord(): undefined | boolean {
    return this.noRecord;
  }
}
