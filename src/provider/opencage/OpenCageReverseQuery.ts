import { ReverseQuery, ReverseQueryObject } from "query";

export interface OpenCageReverseQueryObject extends ReverseQueryObject {
  readonly countryCodes?: string[];
  readonly minConfidence?: number;
  readonly noRecord?: boolean;
}

export default class OpenCageReverseQuery extends ReverseQuery {
  private readonly countryCodes?: string[];

  private readonly minConfidence?: number;

  private readonly noRecord?: boolean;

  protected constructor({
    countryCodes,
    minConfidence,
    noRecord,
    ...reverseQueryObject
  }: OpenCageReverseQueryObject) {
    super(reverseQueryObject);
    this.countryCodes = countryCodes;
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
    object: OpenCageReverseQueryObject
  ): OpenCageReverseQuery {
    return new this(object);
  }

  public toObject(): OpenCageReverseQueryObject {
    return {
      ...super.toObject(),
      countryCodes: this.countryCodes,
      minConfidence: this.minConfidence,
      noRecord: this.noRecord,
    };
  }

  public withCountryCodes(countryCodes: string[]): OpenCageReverseQuery {
    return new OpenCageReverseQuery({ ...this.toObject(), countryCodes });
  }

  public getCountryCodes(): undefined | string[] {
    return this.countryCodes;
  }

  public withMinConfidence(minConfidence: number): OpenCageReverseQuery {
    return new OpenCageReverseQuery({ ...this.toObject(), minConfidence });
  }

  public getMinConfidence(): undefined | number {
    return this.minConfidence;
  }

  public withNoRecord(noRecord: boolean): OpenCageReverseQuery {
    return new OpenCageReverseQuery({ ...this.toObject(), noRecord });
  }

  public getNoRecord(): undefined | boolean {
    return this.noRecord;
  }
}
