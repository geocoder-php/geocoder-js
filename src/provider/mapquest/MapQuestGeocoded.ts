import Geocoded, { GeocodedObject } from "Geocoded";

export interface MapQuestGeocodedObject extends GeocodedObject {
  readonly precision?: string;
  readonly precisionCode?: string;
  readonly mapUrl?: string;
  readonly attribution?: string;
}

export default class MapQuestGeocoded extends Geocoded {
  private readonly precision?: string;

  private readonly precisionCode?: string;

  private readonly mapUrl?: string;

  private readonly attribution?: string;

  protected constructor({
    precision,
    precisionCode,
    mapUrl,
    attribution,
    ...geocodedObject
  }: MapQuestGeocodedObject) {
    super(geocodedObject);
    this.precision = precision;
    this.precisionCode = precisionCode;
    this.mapUrl = mapUrl;
    this.attribution = attribution;
  }

  public static create(object: MapQuestGeocodedObject): MapQuestGeocoded {
    return new this(object);
  }

  public toObject(): MapQuestGeocodedObject {
    return {
      ...super.toObject(),
      precision: this.precision,
      precisionCode: this.precisionCode,
      mapUrl: this.mapUrl,
      attribution: this.attribution,
    };
  }

  public withPrecision(precision: string): MapQuestGeocoded {
    return new MapQuestGeocoded({
      ...this.toObject(),
      precision,
    });
  }

  public getPrecision(): undefined | string {
    return this.precision;
  }

  public withPrecisionCode(precisionCode: string): MapQuestGeocoded {
    return new MapQuestGeocoded({
      ...this.toObject(),
      precisionCode,
    });
  }

  public getPrecisionCode(): undefined | string {
    return this.precisionCode;
  }

  public withMapUrl(mapUrl: string): MapQuestGeocoded {
    return new MapQuestGeocoded({
      ...this.toObject(),
      mapUrl,
    });
  }

  public getMapUrl(): undefined | string {
    return this.mapUrl;
  }

  public withAttribution(attribution: string): MapQuestGeocoded {
    return new MapQuestGeocoded({
      ...this.toObject(),
      attribution,
    });
  }

  public getAttribution(): undefined | string {
    return this.attribution;
  }
}
