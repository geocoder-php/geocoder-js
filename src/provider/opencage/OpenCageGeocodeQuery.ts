import { GeocodeQuery, GeocodeQueryObject } from "query";
import { Coordinates } from "types";

export interface OpenCageGeocodeQueryObject extends GeocodeQueryObject {
  readonly countryCodes?: string[];
  readonly proximity?: Coordinates;
  readonly minPrecision?: number;
  readonly noRecord?: boolean;
}

export default class OpenCageGeocodeQuery extends GeocodeQuery {
  private readonly countryCodes?: string[];

  private readonly proximity?: Coordinates;

  private readonly minPrecision?: number;

  private readonly noRecord?: boolean;

  protected constructor({
    countryCodes,
    proximity,
    minPrecision,
    noRecord,
    ...geocodeQueryObject
  }: OpenCageGeocodeQueryObject) {
    super(geocodeQueryObject);
    this.countryCodes = countryCodes;
    if (proximity && (!proximity.latitude || !proximity.longitude)) {
      throw new Error(
        'The "proximity" parameter must be an object with the keys: "latitude", "longitude".'
      );
    }
    this.proximity = proximity;
    if (
      minPrecision &&
      (minPrecision.toString() !==
        parseInt(minPrecision.toString(), 10).toString() ||
        minPrecision < 1 ||
        minPrecision > 10)
    ) {
      throw new Error(
        'The "minPrecision" parameter must be an integer from 1 to 10.'
      );
    }
    this.minPrecision = minPrecision;
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
      minPrecision: this.minPrecision,
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

  public withMinPrecision(minPrecision: number): OpenCageGeocodeQuery {
    return new OpenCageGeocodeQuery({ ...this.toObject(), minPrecision });
  }

  public getMinPrecision(): undefined | number {
    return this.minPrecision;
  }

  public withNoRecord(noRecord: boolean): OpenCageGeocodeQuery {
    return new OpenCageGeocodeQuery({ ...this.toObject(), noRecord });
  }

  public getNoRecord(): undefined | boolean {
    return this.noRecord;
  }
}
