import AdminLevel from "AdminLevel";

export interface GeocodedObject {
  readonly [property: string]:
    | string
    | string[]
    | number
    | boolean
    | AdminLevel[]
    | undefined;
  readonly latitude?: number;
  readonly longitude?: number;
  readonly south?: number;
  readonly west?: number;
  readonly north?: number;
  readonly east?: number;
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
  private readonly latitude?: number;

  private readonly longitude?: number;

  private readonly south?: number;

  private readonly west?: number;

  private readonly north?: number;

  private readonly east?: number;

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
    latitude,
    longitude,
    south,
    west,
    north,
    east,
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
    this.latitude = latitude;
    this.longitude = longitude;
    this.south = south;
    this.west = west;
    this.north = north;
    this.east = east;
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
      latitude: this.latitude,
      longitude: this.longitude,
      south: this.south,
      west: this.west,
      north: this.north,
      east: this.east,
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

  public withBounds(
    south?: number,
    west?: number,
    north?: number,
    east?: number
  ): Geocoded {
    return (<typeof Geocoded>this.constructor).create({
      ...this.toObject(),
      south,
      west,
      north,
      east,
    });
  }

  public withCoordinates(latitude?: number, longitude?: number): Geocoded {
    return (<typeof Geocoded>this.constructor).create({
      ...this.toObject(),
      latitude,
      longitude,
    });
  }

  public getCoordinates(): [undefined | number, undefined | number] {
    return [this.latitude, this.longitude];
  }

  public getLatitude(): undefined | number {
    return this.latitude;
  }

  public getLongitude(): undefined | number {
    return this.longitude;
  }

  public getBounds(): [
    undefined | number,
    undefined | number,
    undefined | number,
    undefined | number
  ] {
    return [this.south, this.west, this.north, this.east];
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
