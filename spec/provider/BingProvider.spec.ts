import { BingProvider, BingResult } from "provider";
import ExternalLoader from "ExternalLoader";
import Geocoded from "Geocoded";

describe("Bing Geocoder Provider raw result to Geocoded mapping", () => {
  let geocoded: Geocoded;

  const stubBingResult: BingResult = {
    __type: "Location:http://schemas.microsoft.com/search/local/ws/rest/v1",
    bbox: [
      47.636186665473566,
      -122.13744013372656,
      47.64391210061492,
      -122.12215365108256,
    ],
    name: "1 Microsoft Way, Redmond, WA 98052",
    point: {
      type: "Point",
      coordinates: [47.64004938304424, -122.12979689240456],
    },
    address: {
      addressLine: "1 Microsoft Way",
      adminDistrict: "WA",
      adminDistrict2: "King Co.",
      countryRegion: "United States",
      formattedAddress: "1 Microsoft Way, Redmond, WA 98052",
      locality: "Redmond",
      postalCode: "98052",
    },
    confidence: "High",
    entityType: "Address",
    geocodePoints: [
      {
        type: "Point",
        coordinates: [47.64004938304424, -122.12979689240456],
        calculationMethod: "InterpolationOffset",
        usageTypes: ["Display"],
      },
      {
        type: "Point",
        coordinates: [47.64006815850735, -122.12985791265965],
        calculationMethod: "Interpolation",
        usageTypes: ["Route"],
      },
    ],
    matchCodes: ["Good"],
  };

  beforeEach(() => {
    geocoded = BingProvider.mapToGeocoded(stubBingResult);
  });

  it("receives results from the Bing geocoder", () => {
    expect(geocoded).toBeDefined();
  });

  it("expects API Key to be required on initiation", () => {
    expect(() => new BingProvider(new ExternalLoader())).toThrowError(
      Error,
      'An API key is required for the Bing provider. Please add it in the "apiKey" option.'
    );
  });

  it("maps coordinates correctly", () => {
    expect(geocoded.getCoordinates()).toEqual([
      47.64004938304424,
      -122.12979689240456,
    ]);
  });

  it("maps bounds correctly", () => {
    expect(geocoded.getBounds()).toEqual([
      47.636186665473566,
      -122.13744013372656,
      47.64391210061492,
      -122.12215365108256,
    ]);
  });

  it("maps formatted address correctly", () => {
    expect(geocoded.getFormattedAddress()).toEqual(
      "1 Microsoft Way, Redmond, WA 98052"
    );
  });

  it("maps street name correctly", () => {
    expect(geocoded.getStreetName()).toEqual("1 Microsoft Way");
  });

  it("maps locality correctly", () => {
    expect(geocoded.getLocality()).toEqual("Redmond");
  });

  it("maps postal code correctly", () => {
    expect(geocoded.getPostalCode()).toEqual("98052");
  });

  it("maps region correctly", () => {
    expect(geocoded.getRegion()).toEqual("WA");
  });

  it("maps country correctly", () => {
    expect(geocoded.getCountry()).toEqual("United States");
  });
});
