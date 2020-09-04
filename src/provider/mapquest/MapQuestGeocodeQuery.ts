import { GeocodeQuery, GeocodeQueryObject } from "query";
import { MapQuestLocation, MapQuestLocationObject } from "provider";
import Geocoded, { GeocodedObject } from "Geocoded";
import { ADMIN_LEVEL_CODES } from "AdminLevel";

export interface MapQuestGeocodeQueryObject extends GeocodeQueryObject {
  readonly location?:
    | MapQuestLocationObject
    | MapQuestLocation
    | GeocodedObject
    | Geocoded;
}

export default class MapQuestGeocodeQuery extends GeocodeQuery {
  private readonly location?: MapQuestLocationObject;

  protected constructor({
    location,
    ...geocodeQueryObject
  }: MapQuestGeocodeQueryObject) {
    super({
      ...geocodeQueryObject,
      text: location ? "from_location" : geocodeQueryObject.text,
    });
    if (!location) {
      return;
    }
    if ("getLatLng" in location) {
      this.location = (<MapQuestLocation>location).toObject();
      return;
    }
    if ("getLocality" in location) {
      this.location = MapQuestGeocodeQuery.convertGeocodedToLocationObject(
        <Geocoded>location
      );
      return;
    }
    let geocodedPropsNumber = 0;
    let mapQuestLocationPropsNumber = 0;
    const geocodedObject = Geocoded.create({}).toObject();
    Object.keys(geocodedObject).forEach((prop) => {
      if (prop in location) {
        geocodedPropsNumber += 1;
      }
    });
    [
      "street",
      "adminArea5",
      "city",
      "adminArea4",
      "county",
      "adminArea3",
      "state",
      "adminArea1",
      "country",
      "postalCode",
      "type",
    ].forEach((prop) => {
      if (prop in location) {
        mapQuestLocationPropsNumber += 1;
      }
    });
    if (geocodedPropsNumber > mapQuestLocationPropsNumber) {
      this.location = MapQuestGeocodeQuery.convertGeocodedToLocationObject(
        Geocoded.create(<GeocodedObject>location)
      );
      return;
    }

    this.location = location;
  }

  public static create(
    object: MapQuestGeocodeQueryObject
  ): MapQuestGeocodeQuery {
    return new this(object);
  }

  public toObject(): MapQuestGeocodeQueryObject {
    return {
      ...super.toObject(),
      location: this.location,
    };
  }

  public withLocation(
    location:
      | MapQuestLocationObject
      | MapQuestLocation
      | GeocodedObject
      | Geocoded
  ): MapQuestGeocodeQuery {
    return new MapQuestGeocodeQuery({ ...this.toObject(), location });
  }

  public getLocation(): undefined | MapQuestLocationObject {
    return this.location;
  }

  private static convertGeocodedToLocationObject(
    geocoded: Geocoded
  ): MapQuestLocationObject {
    const location: MapQuestLocationObject = {};

    const streetParts = [
      geocoded.getStreetNumber() || "",
      geocoded.getStreetName() || "",
    ];
    const street = streetParts.join(" ");
    if (street) {
      location.street = street;
    }
    if (geocoded.getLocality()) {
      location.city = geocoded.getLocality();
    }
    if (geocoded.getCountry()) {
      location.country = geocoded.getCountry();
    }
    if (geocoded.getPostalCode()) {
      location.postalCode = geocoded.getPostalCode();
    }
    geocoded.getAdminLevels().forEach((adminLevel) => {
      if (adminLevel.getLevel() === ADMIN_LEVEL_CODES.STATE_CODE) {
        location.state = adminLevel.getCode() || adminLevel.getName();
      }
      if (adminLevel.getLevel() === ADMIN_LEVEL_CODES.COUNTY_CODE) {
        location.county = adminLevel.getCode() || adminLevel.getName();
      }
    });

    return location;
  }
}
