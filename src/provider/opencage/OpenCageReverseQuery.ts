import { ReverseQuery, ReverseQueryObject } from "query";

export interface OpenCageReverseQueryObject extends ReverseQueryObject {
  readonly countryCodes?: string[];
  readonly minPrecision?: number;
  readonly noRecord?: boolean;
}

export default class OpenCageReverseQuery extends ReverseQuery {
  private readonly countryCodes?: string[];

  private readonly minPrecision?: number;

  private readonly noRecord?: boolean;

  protected constructor({
    countryCodes,
    minPrecision,
    noRecord,
    ...reverseQueryObject
  }: OpenCageReverseQueryObject) {
    super(reverseQueryObject);
    this.countryCodes = countryCodes;
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
    object: OpenCageReverseQueryObject
  ): OpenCageReverseQuery {
    return new this(object);
  }

  public toObject(): OpenCageReverseQueryObject {
    return {
      ...super.toObject(),
      countryCodes: this.countryCodes,
      minPrecision: this.minPrecision,
      noRecord: this.noRecord,
    };
  }

  public withCountryCodes(countryCodes: string[]): OpenCageReverseQuery {
    return new OpenCageReverseQuery({ ...this.toObject(), countryCodes });
  }

  public getCountryCodes(): undefined | string[] {
    return this.countryCodes;
  }

  public withMinPrecision(minPrecision: number): OpenCageReverseQuery {
    return new OpenCageReverseQuery({ ...this.toObject(), minPrecision });
  }

  public getMinPrecision(): undefined | number {
    return this.minPrecision;
  }

  public withNoRecord(noRecord: boolean): OpenCageReverseQuery {
    return new OpenCageReverseQuery({ ...this.toObject(), noRecord });
  }

  public getNoRecord(): undefined | boolean {
    return this.noRecord;
  }
}
