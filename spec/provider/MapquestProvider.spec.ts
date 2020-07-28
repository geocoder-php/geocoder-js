import { MapquestProvider, MapQuestResult } from "provider";
import ExternalLoader from "ExternalLoader";
import Geocoded from "Geocoded";

describe("Mapquest Geocoder Provider raw result to Geocoded mapping", () => {
  let geocoded: Geocoded;

  const stubMapQuestResult: MapQuestResult = {
    adminArea1: "US",
    adminArea1Type: "Country",
    adminArea3: "",
    adminArea3Type: "State",
    latLng: {
      lng: -77.036372,
      lat: 38.895115,
    },
    adminArea4: "District of Columbia",
    adminArea5Type: "City",
    adminArea4Type: "County",
    adminArea5: "Washington",
    street: "1600 Pennsylvania Ave",
    type: "s",
    displayLatLng: {
      lng: -77.036372,
      lat: 38.895115,
    },
    linkId: "0",
    postalCode: "20050",
    sideOfStreet: "N",
    dragPoint: false,
    geocodeQuality: "CITY",
    geocodeQualityCode: "A5XCX",
  };

  beforeEach(() => {
    geocoded = MapquestProvider.mapToGeocoded(stubMapQuestResult);
  });

  it("receives results from the MapQuest geocoder", () => {
    expect(geocoded).toBeDefined();
  });

  it("expects API Key to be required on initiation", () => {
    expect(() => new MapquestProvider(new ExternalLoader())).toThrowError(
      Error,
      'An API key is required for the MapQuest provider. Please add it in the "apiKey" option.'
    );
  });

  it("maps coordinates correctly", () => {
    expect(geocoded.getCoordinates()).toEqual([38.895115, -77.036372]);
  });

  it("maps street name correctly", () => {
    expect(geocoded.getStreetName()).toEqual("1600 Pennsylvania Ave");
  });

  it("maps sublocality correctly", () => {
    expect(geocoded.getSubLocality()).toEqual(undefined);
  });

  it("maps locality correctly", () => {
    expect(geocoded.getLocality()).toEqual("Washington");
  });

  it("maps postal code correctly", () => {
    expect(geocoded.getPostalCode()).toEqual("20050");
  });

  it("maps region correctly", () => {
    expect(geocoded.getRegion()).toEqual("District of Columbia");
  });

  it("maps country correctly", () => {
    expect(geocoded.getCountry()).toEqual("US");
  });

  it("maps country code correctly", () => {
    expect(geocoded.getCountryCode()).toEqual("US");
  });
});
