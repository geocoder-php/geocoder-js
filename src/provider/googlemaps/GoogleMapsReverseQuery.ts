import { ReverseQuery, ReverseQueryObject } from "query";

export interface GoogleMapsReverseQueryObject extends ReverseQueryObject {
  readonly resultTypes?: string[];
  readonly locationTypes?: string[];
  readonly channel?: string;
}

export default class GoogleMapsReverseQuery extends ReverseQuery {
  private readonly resultTypes?: string[];

  private readonly locationTypes?: string[];

  private readonly channel?: string;

  protected constructor({
    resultTypes,
    locationTypes,
    channel,
    ...reverseQueryObject
  }: GoogleMapsReverseQueryObject) {
    super(reverseQueryObject);
    this.resultTypes = resultTypes;
    this.locationTypes = locationTypes;
    this.channel = channel;
  }

  public static create(
    object: GoogleMapsReverseQueryObject
  ): GoogleMapsReverseQuery {
    return new this(object);
  }

  public toObject(): GoogleMapsReverseQueryObject {
    return {
      ...super.toObject(),
      resultTypes: this.resultTypes,
      locationTypes: this.locationTypes,
      channel: this.channel,
    };
  }

  public withResultTypes(resultTypes: string[]): GoogleMapsReverseQuery {
    return new GoogleMapsReverseQuery({ ...this.toObject(), resultTypes });
  }

  public getResultTypes(): undefined | string[] {
    return this.resultTypes;
  }

  public withLocationTypes(locationTypes: string[]): GoogleMapsReverseQuery {
    return new GoogleMapsReverseQuery({ ...this.toObject(), locationTypes });
  }

  public getLocationTypes(): undefined | string[] {
    return this.locationTypes;
  }

  public withChannel(channel: string): GoogleMapsReverseQuery {
    return new GoogleMapsReverseQuery({ ...this.toObject(), channel });
  }

  public getChannel(): undefined | string {
    return this.channel;
  }
}
