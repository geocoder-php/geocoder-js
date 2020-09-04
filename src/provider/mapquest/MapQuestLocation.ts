import { MapQuestCoordinates } from "provider";

export interface MapQuestLocationObject {
  latLng?: MapQuestCoordinates;
  street?: string;
  adminArea1?: string;
  country?: string;
  adminArea3?: string;
  state?: string;
  adminArea4?: string;
  county?: string;
  adminArea5?: string;
  city?: string;
  postalCode?: string;
  type?: "s" | "v";
}

export default class MapQuestLocation {
  private readonly latLng?: MapQuestCoordinates;

  private readonly street?: string;

  private readonly adminArea1?: string;

  private readonly country?: string;

  private readonly adminArea3?: string;

  private readonly state?: string;

  private readonly adminArea4?: string;

  private readonly county?: string;

  private readonly adminArea5?: string;

  private readonly city?: string;

  private readonly postalCode?: string;

  private readonly type?: "s" | "v";

  protected constructor({
    latLng,
    street,
    adminArea1,
    country,
    adminArea3,
    state,
    adminArea4,
    county,
    adminArea5,
    city,
    postalCode,
    type,
  }: MapQuestLocationObject) {
    this.latLng = latLng;
    this.street = street;
    this.adminArea1 = adminArea1;
    this.country = country;
    this.adminArea3 = adminArea3;
    this.state = state;
    this.adminArea4 = adminArea4;
    this.county = county;
    this.adminArea5 = adminArea5;
    this.city = city;
    this.postalCode = postalCode;
    this.type = type;
  }

  public static create(object: MapQuestLocationObject): MapQuestLocation {
    return new this(object);
  }

  public toObject(): MapQuestLocationObject {
    return {
      latLng: this.latLng,
      street: this.street,
      adminArea1: this.adminArea1,
      country: this.country,
      adminArea3: this.adminArea3,
      state: this.state,
      adminArea4: this.adminArea4,
      county: this.county,
      adminArea5: this.adminArea5,
      city: this.city,
      postalCode: this.postalCode,
      type: this.type,
    };
  }

  public getLatLng(): undefined | MapQuestCoordinates {
    return this.latLng;
  }

  public getStreet(): undefined | string {
    return this.street;
  }

  public getAdminArea1(): undefined | string {
    return this.adminArea1;
  }

  public getCountry(): undefined | string {
    return this.country;
  }

  public getAdminArea3(): undefined | string {
    return this.adminArea3;
  }

  public getState(): undefined | string {
    return this.state;
  }

  public getAdminArea4(): undefined | string {
    return this.adminArea4;
  }

  public getCounty(): undefined | string {
    return this.county;
  }

  public getAdminArea5(): undefined | string {
    return this.adminArea5;
  }

  public getCity(): undefined | string {
    return this.city;
  }

  public getPostalCode(): undefined | string {
    return this.postalCode;
  }

  public getType(): undefined | "s" | "v" {
    return this.type;
  }
}
