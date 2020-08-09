import { GeocodeQuery, GeocodeQueryObject } from "query";

interface GoogleMapsComponent {
  name: string;
  value: string;
}

export interface GoogleMapsGeocodeQueryObject extends GeocodeQueryObject {
  readonly countryCodes?: string[];
  readonly components?: GoogleMapsComponent[];
  readonly channel?: string;
}

export default class GoogleMapsGeocodeQuery extends GeocodeQuery {
  private readonly countryCodes?: string[];

  private readonly components?: GoogleMapsComponent[];

  private readonly channel?: string;

  protected constructor({
    countryCodes,
    components,
    channel,
    ...geocodeQueryObject
  }: GoogleMapsGeocodeQueryObject) {
    super(geocodeQueryObject);
    if (countryCodes && countryCodes.length !== 1) {
      throw new Error(
        'The "countryCodes" parameter must have only one country code top-level domain.'
      );
    }
    this.countryCodes = countryCodes;
    this.components = components;
    this.channel = channel;
  }

  public static create(
    object: GoogleMapsGeocodeQueryObject
  ): GoogleMapsGeocodeQuery {
    return new this(object);
  }

  public toObject(): GoogleMapsGeocodeQueryObject {
    return {
      ...super.toObject(),
      countryCodes: this.countryCodes,
      components: this.components,
      channel: this.channel,
    };
  }

  public withCountryCodes(countryCodes: string[]): GoogleMapsGeocodeQuery {
    return new GoogleMapsGeocodeQuery({ ...this.toObject(), countryCodes });
  }

  public getCountryCodes(): undefined | string[] {
    return this.countryCodes;
  }

  public withComponents(
    components: GoogleMapsComponent[]
  ): GoogleMapsGeocodeQuery {
    return new GoogleMapsGeocodeQuery({ ...this.toObject(), components });
  }

  public getComponents(): undefined | GoogleMapsComponent[] {
    return this.components;
  }

  public withChannel(channel: string): GoogleMapsGeocodeQuery {
    return new GoogleMapsGeocodeQuery({ ...this.toObject(), channel });
  }

  public getChannel(): undefined | string {
    return this.channel;
  }
}
