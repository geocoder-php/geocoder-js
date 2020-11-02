import AdminLevel from "AdminLevel";
import { BoundingBox, Coordinates } from "types";

export interface GeocodedObject {
  readonly [property: string]:
    | string
    | string[]
    | number
    | boolean
    | Coordinates
    | BoundingBox
    | AdminLevel[]
    | undefined;
  readonly coordinates?: Coordinates;
  readonly bounds?: BoundingBox;
  readonly formattedAddress?: string;
  readonly streetNumber?: string;
  readonly streetName?: string;
  readonly subLocality?: string;
  readonly locality?: string;
  readonly postalCode?: string;
  readonly region?: string;
  readonly adminLevels?: AdminLevel[];
  readonly country?: string;
  readonly countryCode?: string;
  readonly timezone?: string;
}

export default class Geocoded {
  private readonly coordinates?: Coordinates;

  private readonly bounds?: BoundingBox;

  private readonly formattedAddress?: string;

  private readonly streetNumber?: string;

  private readonly streetName?: string;

  private readonly subLocality?: string;

  private readonly locality?: string;

  private readonly postalCode?: string;

  private readonly region?: string;

  private readonly adminLevels: AdminLevel[];

  private readonly country?: string;

  private readonly countryCode?: string;

  private readonly timezone?: string;

  protected constructor({
    coordinates,
    bounds,
    formattedAddress,
    streetNumber,
    streetName,
    subLocality,
    locality,
    postalCode,
    region,
    adminLevels,
    country,
    countryCode,
    timezone,
  }: GeocodedObject) {
    this.coordinates = coordinates;
    this.bounds = bounds;
    this.formattedAddress = formattedAddress;
    this.streetNumber = streetNumber;
    this.streetName = streetName;
    this.subLocality = subLocality;
    this.locality = locality;
    this.postalCode = postalCode;
    this.region = region;
    this.adminLevels = adminLevels || [];
    this.country = country;
    this.countryCode = countryCode;
    this.timezone = timezone;
  }

  public static create(object: GeocodedObject): Geocoded {
    return new this(object);
  }

  public toObject(): GeocodedObject {
    return {
      coordinates: this.coordinates,
      bounds: this.bounds,
      formattedAddress: this.formattedAddress,
      streetNumber: this.streetNumber,
      streetName: this.streetName,
      subLocality: this.subLocality,
      locality: this.locality,
      postalCode: this.postalCode,
      region: this.region,
      adminLevels: this.adminLevels,
      country: this.country,
      countryCode: this.countryCode,
      timezone: this.timezone,
    };
  }

  public withBounds(bounds: BoundingBox): Geocoded {
    return (<typeof Geocoded>this.constructor).create({
      ...this.toObject(),
      bounds,
    });
  }

  public withCoordinates(coordinates: Coordinates): Geocoded {
    return (<typeof Geocoded>this.constructor).create({
      ...this.toObject(),
      coordinates,
    });
  }

  public getCoordinates(): undefined | Coordinates {
    return this.coordinates;
  }

  public getBounds(): undefined | BoundingBox {
    return this.bounds;
  }

  public getFormattedAddress(): undefined | string {
    return this.formattedAddress;
  }

  public getStreetNumber(): undefined | string {
    return this.streetNumber;
  }

  public getStreetName(): undefined | string {
    return this.streetName;
  }

  public getSubLocality(): undefined | string {
    return this.subLocality;
  }

  public getLocality(): undefined | string {
    return this.locality;
  }

  public getPostalCode(): undefined | string {
    return this.postalCode;
  }

  public getRegion(): undefined | string {
    return this.region;
  }

  public addAdminLevel(adminLevel: AdminLevel): void {
    this.adminLevels.push(adminLevel);
  }

  public getAdminLevels(): AdminLevel[] {
    return this.adminLevels;
  }

  public getCountry(): undefined | string {
    return this.country;
  }

  public getCountryCode(): undefined | string {
    return this.countryCode;
  }

  public getTimezone(): undefined | string {
    return this.timezone;
  }
}
