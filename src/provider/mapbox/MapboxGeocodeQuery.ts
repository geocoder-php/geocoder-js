import { GeocodeQuery, GeocodeQueryObject } from "query";

export interface MapboxGeocodeQueryObject extends GeocodeQueryObject {
  readonly countryCodes?: string[];
  readonly proximity?: Coordinates;
  readonly locationTypes?: string[];
}

export default class MapboxGeocodeQuery extends GeocodeQuery {
  private readonly countryCodes?: string[];

  private readonly proximity?: Coordinates;

  private readonly locationTypes?: string[];

  protected constructor({
    countryCodes,
    proximity,
    locationTypes,
    ...geocodeQueryObject
  }: MapboxGeocodeQueryObject) {
    super(geocodeQueryObject);
    this.countryCodes = countryCodes;
    this.proximity = proximity;
    this.locationTypes = locationTypes;
  }

  public static create(object: MapboxGeocodeQueryObject): MapboxGeocodeQuery {
    return new this(object);
  }

  public toObject(): MapboxGeocodeQueryObject {
    return {
      ...super.toObject(),
      countryCodes: this.countryCodes,
      proximity: this.proximity,
      locationTypes: this.locationTypes,
    };
  }

  public withCountryCodes(countryCodes: string[]): MapboxGeocodeQuery {
    return new MapboxGeocodeQuery({ ...this.toObject(), countryCodes });
  }

  public getCountryCodes(): undefined | string[] {
    return this.countryCodes;
  }

  public withProximity(proximity: Coordinates): MapboxGeocodeQuery {
    return new MapboxGeocodeQuery({ ...this.toObject(), proximity });
  }

  public getProximity(): undefined | Coordinates {
    return this.proximity;
  }

  public withLocationTypes(locationTypes: string[]): MapboxGeocodeQuery {
    return new MapboxGeocodeQuery({ ...this.toObject(), locationTypes });
  }

  public getLocationTypes(): undefined | string[] {
    return this.locationTypes;
  }
}
