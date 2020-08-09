import Geocoded, { GeocodedObject } from "Geocoded";
import AdminLevel from "AdminLevel";

export interface GoogleMapsGeocodedObject extends GeocodedObject {
  readonly placeId?: string;
  readonly partialMatch?: boolean;
  readonly resultType?: string[];
  readonly locationType?: string;
  readonly streetAddress?: string;
  readonly intersection?: string;
  readonly political?: string;
  readonly colloquialArea?: string;
  readonly ward?: string;
  readonly neighborhood?: string;
  readonly premise?: string;
  readonly subpremise?: string;
  readonly naturalFeature?: string;
  readonly airport?: string;
  readonly park?: string;
  readonly pointOfInterest?: string;
  readonly establishment?: string;
  readonly postalCodeSuffix?: string;
  readonly subLocalityLevels?: AdminLevel[];
}

export default class GoogleMapsGeocoded extends Geocoded {
  private readonly placeId?: string;

  private readonly partialMatch?: boolean;

  private readonly resultType?: string[];

  private readonly locationType?: string;

  private readonly streetAddress?: string;

  private readonly intersection?: string;

  private readonly political?: string;

  private readonly colloquialArea?: string;

  private readonly ward?: string;

  private readonly neighborhood?: string;

  private readonly premise?: string;

  private readonly subpremise?: string;

  private readonly naturalFeature?: string;

  private readonly airport?: string;

  private readonly park?: string;

  private readonly pointOfInterest?: string;

  private readonly establishment?: string;

  private readonly postalCodeSuffix?: string;

  private readonly subLocalityLevels: AdminLevel[];

  protected constructor({
    placeId,
    partialMatch,
    resultType,
    locationType,
    streetAddress,
    intersection,
    political,
    colloquialArea,
    ward,
    neighborhood,
    premise,
    subpremise,
    naturalFeature,
    airport,
    park,
    pointOfInterest,
    establishment,
    postalCodeSuffix,
    subLocalityLevels,
    ...geocodedObject
  }: GoogleMapsGeocodedObject) {
    super(geocodedObject);
    this.placeId = placeId;
    this.partialMatch = partialMatch;
    this.resultType = resultType;
    this.locationType = locationType;
    this.streetAddress = streetAddress;
    this.intersection = intersection;
    this.political = political;
    this.colloquialArea = colloquialArea;
    this.ward = ward;
    this.neighborhood = neighborhood;
    this.premise = premise;
    this.subpremise = subpremise;
    this.naturalFeature = naturalFeature;
    this.airport = airport;
    this.park = park;
    this.pointOfInterest = pointOfInterest;
    this.establishment = establishment;
    this.postalCodeSuffix = postalCodeSuffix;
    this.subLocalityLevels = subLocalityLevels || [];
  }

  public static create(object: GoogleMapsGeocodedObject): GoogleMapsGeocoded {
    return new this(object);
  }

  public toObject(): GoogleMapsGeocodedObject {
    return {
      ...super.toObject(),
      placeId: this.placeId,
      partialMatch: this.partialMatch,
      resultType: this.resultType,
      locationType: this.locationType,
      streetAddress: this.streetAddress,
      intersection: this.intersection,
      political: this.political,
      colloquialArea: this.colloquialArea,
      ward: this.ward,
      neighborhood: this.neighborhood,
      premise: this.premise,
      subpremise: this.subpremise,
      naturalFeature: this.naturalFeature,
      airport: this.airport,
      park: this.park,
      pointOfInterest: this.pointOfInterest,
      establishment: this.establishment,
      postalCodeSuffix: this.postalCodeSuffix,
      subLocalityLevels: this.subLocalityLevels,
    };
  }

  public withPlaceId(placeId: string): GoogleMapsGeocoded {
    return new GoogleMapsGeocoded({
      ...this.toObject(),
      placeId,
    });
  }

  public getPlaceId(): undefined | string {
    return this.placeId;
  }

  public withPartialMatch(partialMatch: boolean): GoogleMapsGeocoded {
    return new GoogleMapsGeocoded({
      ...this.toObject(),
      partialMatch,
    });
  }

  public isPartialMatch(): undefined | boolean {
    return this.partialMatch;
  }

  public withResultType(resultType: string[]): GoogleMapsGeocoded {
    return new GoogleMapsGeocoded({
      ...this.toObject(),
      resultType,
    });
  }

  public getResultType(): undefined | string[] {
    return this.resultType;
  }

  public withLocationType(locationType: string): GoogleMapsGeocoded {
    return new GoogleMapsGeocoded({
      ...this.toObject(),
      locationType,
    });
  }

  public getLocationType(): undefined | string {
    return this.locationType;
  }

  public withStreetAddress(streetAddress: string): GoogleMapsGeocoded {
    return new GoogleMapsGeocoded({
      ...this.toObject(),
      streetAddress,
    });
  }

  public getStreetAddress(): undefined | string {
    return this.streetAddress;
  }

  public withIntersection(intersection: string): GoogleMapsGeocoded {
    return new GoogleMapsGeocoded({
      ...this.toObject(),
      intersection,
    });
  }

  public getIntersection(): undefined | string {
    return this.intersection;
  }

  public withPolitical(political: string): GoogleMapsGeocoded {
    return new GoogleMapsGeocoded({
      ...this.toObject(),
      political,
    });
  }

  public getPolitical(): undefined | string {
    return this.political;
  }

  public withColloquialArea(colloquialArea: string): GoogleMapsGeocoded {
    return new GoogleMapsGeocoded({
      ...this.toObject(),
      colloquialArea,
    });
  }

  public getColloquialArea(): undefined | string {
    return this.colloquialArea;
  }

  public withWard(ward: string): GoogleMapsGeocoded {
    return new GoogleMapsGeocoded({
      ...this.toObject(),
      ward,
    });
  }

  public getWard(): undefined | string {
    return this.ward;
  }

  public withNeighborhood(neighborhood: string): GoogleMapsGeocoded {
    return new GoogleMapsGeocoded({
      ...this.toObject(),
      neighborhood,
    });
  }

  public getNeighborhood(): undefined | string {
    return this.neighborhood;
  }

  public withPremise(premise: string): GoogleMapsGeocoded {
    return new GoogleMapsGeocoded({
      ...this.toObject(),
      premise,
    });
  }

  public getPremise(): undefined | string {
    return this.premise;
  }

  public withSubpremise(subpremise: string): GoogleMapsGeocoded {
    return new GoogleMapsGeocoded({
      ...this.toObject(),
      subpremise,
    });
  }

  public getSubpremise(): undefined | string {
    return this.subpremise;
  }

  public withNaturalFeature(naturalFeature: string): GoogleMapsGeocoded {
    return new GoogleMapsGeocoded({
      ...this.toObject(),
      naturalFeature,
    });
  }

  public getNaturalFeature(): undefined | string {
    return this.naturalFeature;
  }

  public withAirport(airport: string): GoogleMapsGeocoded {
    return new GoogleMapsGeocoded({
      ...this.toObject(),
      airport,
    });
  }

  public getAirport(): undefined | string {
    return this.airport;
  }

  public withPark(park: string): GoogleMapsGeocoded {
    return new GoogleMapsGeocoded({
      ...this.toObject(),
      park,
    });
  }

  public getPark(): undefined | string {
    return this.park;
  }

  public withPointOfInterest(pointOfInterest: string): GoogleMapsGeocoded {
    return new GoogleMapsGeocoded({
      ...this.toObject(),
      pointOfInterest,
    });
  }

  public getPointOfInterest(): undefined | string {
    return this.pointOfInterest;
  }

  public withEstablishment(establishment: string): GoogleMapsGeocoded {
    return new GoogleMapsGeocoded({
      ...this.toObject(),
      establishment,
    });
  }

  public getEstablishment(): undefined | string {
    return this.establishment;
  }

  public withPostalCodeSuffix(postalCodeSuffix: string): GoogleMapsGeocoded {
    return new GoogleMapsGeocoded({
      ...this.toObject(),
      postalCodeSuffix,
    });
  }

  public getPostalCodeSuffix(): undefined | string {
    return this.postalCodeSuffix;
  }

  public addSubLocalityLevel(subLocalityLevel: AdminLevel): void {
    this.subLocalityLevels.push(subLocalityLevel);
  }

  public getSubLocalityLevels(): AdminLevel[] {
    return this.subLocalityLevels;
  }
}
