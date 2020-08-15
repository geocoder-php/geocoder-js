import Geocoded, { GeocodedObject } from "Geocoded";

export interface GeoPluginGeocodedObject extends GeocodedObject {
  readonly attribution?: string;
}

export default class GeoPluginGeocoded extends Geocoded {
  private readonly attribution?: string;

  protected constructor({
    attribution,
    ...geocodedObject
  }: GeoPluginGeocodedObject) {
    super(geocodedObject);
    this.attribution = attribution;
  }

  public static create(object: GeoPluginGeocodedObject): GeoPluginGeocoded {
    return new this(object);
  }

  public toObject(): GeoPluginGeocodedObject {
    return {
      ...super.toObject(),
      attribution: this.attribution,
    };
  }

  public withAttribution(attribution: string): GeoPluginGeocoded {
    return new GeoPluginGeocoded({
      ...this.toObject(),
      attribution,
    });
  }

  public getAttribution(): undefined | string {
    return this.attribution;
  }
}
