import Geocoded, { GeocodedObject } from "Geocoded";

export interface OpenCageGeocodedObject extends GeocodedObject {
  readonly callingCode?: number;
  readonly flag?: string;
  readonly precision?: number;
  readonly mgrs?: string;
  readonly maidenhead?: string;
  readonly geohash?: string;
  readonly what3words?: string;
}

export default class OpenCageGeocoded extends Geocoded {
  private readonly callingCode?: number;

  private readonly flag?: string;

  private readonly precision?: number;

  private readonly mgrs?: string;

  private readonly maidenhead?: string;

  private readonly geohash?: string;

  private readonly what3words?: string;

  protected constructor({
    callingCode,
    flag,
    precision,
    mgrs,
    maidenhead,
    geohash,
    what3words,
    ...geocodedObject
  }: OpenCageGeocodedObject) {
    super(geocodedObject);
    this.callingCode = callingCode;
    this.flag = flag;
    this.precision = precision;
    this.mgrs = mgrs;
    this.maidenhead = maidenhead;
    this.geohash = geohash;
    this.what3words = what3words;
  }

  public static create(object: OpenCageGeocodedObject): OpenCageGeocoded {
    return new this(object);
  }

  public toObject(): OpenCageGeocodedObject {
    return {
      ...super.toObject(),
      callingCode: this.callingCode,
      flag: this.flag,
      precision: this.precision,
      mgrs: this.mgrs,
      maidenhead: this.maidenhead,
      geohash: this.geohash,
      what3words: this.what3words,
    };
  }

  public withCallingCode(callingCode: number): OpenCageGeocoded {
    return new OpenCageGeocoded({
      ...this.toObject(),
      callingCode,
    });
  }

  public getCallingCode(): undefined | number {
    return this.callingCode;
  }

  public withFlag(flag: string): OpenCageGeocoded {
    return new OpenCageGeocoded({
      ...this.toObject(),
      flag,
    });
  }

  public getFlag(): undefined | string {
    return this.flag;
  }

  public withPrecision(precision: number): OpenCageGeocoded {
    return new OpenCageGeocoded({
      ...this.toObject(),
      precision,
    });
  }

  public getPrecision(): undefined | number {
    return this.precision;
  }

  public withMgrs(mgrs: string): OpenCageGeocoded {
    return new OpenCageGeocoded({
      ...this.toObject(),
      mgrs,
    });
  }

  public getMgrs(): undefined | string {
    return this.mgrs;
  }

  public withMaidenhead(maidenhead: string): OpenCageGeocoded {
    return new OpenCageGeocoded({
      ...this.toObject(),
      maidenhead,
    });
  }

  public getMaidenhead(): undefined | string {
    return this.maidenhead;
  }

  public withGeohash(geohash: string): OpenCageGeocoded {
    return new OpenCageGeocoded({
      ...this.toObject(),
      geohash,
    });
  }

  public getGeohash(): undefined | string {
    return this.geohash;
  }

  public withWhat3words(what3words: string): OpenCageGeocoded {
    return new OpenCageGeocoded({
      ...this.toObject(),
      what3words,
    });
  }

  public getWhat3words(): undefined | string {
    return this.what3words;
  }
}
