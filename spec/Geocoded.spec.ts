import Geocoded from "Geocoded";

describe("Geocoded API", () => {
  const geocoded = Geocoded.create({});

  it("has getCoordinates method", () => {
    expect(geocoded.getCoordinates).toBeDefined();
  });
  it("has getLatitude method", () => {
    expect(geocoded.getLatitude).toBeDefined();
  });
  it("has getLongitude method", () => {
    expect(geocoded.getLongitude).toBeDefined();
  });
  it("has getBounds method", () => {
    expect(geocoded.getBounds).toBeDefined();
  });
  it("has getFormattedAddress method", () => {
    expect(geocoded.getFormattedAddress).toBeDefined();
  });
  it("has getStreetNumber method", () => {
    expect(geocoded.getStreetNumber).toBeDefined();
  });
  it("has getStreetName method", () => {
    expect(geocoded.getStreetName).toBeDefined();
  });
  it("has getSubLocality method", () => {
    expect(geocoded.getSubLocality).toBeDefined();
  });
  it("has getLocality method", () => {
    expect(geocoded.getLocality).toBeDefined();
  });
  it("has getPostalCode method", () => {
    expect(geocoded.getPostalCode).toBeDefined();
  });
  it("has getRegion method", () => {
    expect(geocoded.getRegion).toBeDefined();
  });
  it("has getCountry method", () => {
    expect(geocoded.getCountry).toBeDefined();
  });
  it("has getCountryCode method", () => {
    expect(geocoded.getCountryCode).toBeDefined();
  });
  it("has getTimezone method", () => {
    expect(geocoded.getTimezone).toBeDefined();
  });
});

describe("Geocoded returns data properly", () => {
  let geocoded = Geocoded.create({
    latitude: 38.8978378,
    longitude: -77.0365123,
    formattedAddress:
      "1600 Pennsylvania Avenue Northwest, Washington, DC 20050",
    streetNumber: "1600",
    streetName: "Pennsylvania Avenue Northwest",
    locality: "Washington",
    postalCode: "20050",
    region: "DC",
    country: "United States",
    countryCode: "US",
    timezone: "America/New_York",
  });
  geocoded = geocoded.withBounds({
    latitude1: 38.89380528242933,
    longitude1: -77.04317326462667,
    latitude2: 38.90153071757068,
    longitude2: -77.02993873537334,
  });

  it("returns proper coordinates", () => {
    const expectedCoordinates = [38.8978378, -77.0365123];
    expect(geocoded.getCoordinates()).toEqual(expectedCoordinates);
  });

  it("returns latitude/longitude individually", () => {
    expect(geocoded.getLatitude()).toEqual(38.8978378);
    expect(geocoded.getLongitude()).toEqual(-77.0365123);
  });

  it("returns proper bounds", () => {
    expect(geocoded.getBounds()).toEqual({
      latitude1: 38.89380528242933,
      longitude1: -77.04317326462667,
      latitude2: 38.90153071757068,
      longitude2: -77.02993873537334,
    });
  });

  it("returns proper formatted address", () => {
    expect(geocoded.getFormattedAddress()).toEqual(
      "1600 Pennsylvania Avenue Northwest, Washington, DC 20050"
    );
  });

  it("returns proper street number", () => {
    expect(geocoded.getStreetNumber()).toEqual("1600");
  });

  it("returns proper street name", () => {
    expect(geocoded.getStreetName()).toEqual("Pennsylvania Avenue Northwest");
  });

  it("returns proper sublocality", () => {
    expect(geocoded.getSubLocality()).toEqual(undefined);
  });

  it("returns proper locality", () => {
    expect(geocoded.getLocality()).toEqual("Washington");
  });

  it("returns proper postal code", () => {
    expect(geocoded.getPostalCode()).toEqual("20050");
  });

  it("returns proper region", () => {
    expect(geocoded.getRegion()).toEqual("DC");
  });

  it("returns proper country", () => {
    expect(geocoded.getCountry()).toEqual("United States");
  });

  it("returns proper country code", () => {
    expect(geocoded.getCountryCode()).toEqual("US");
  });

  it("returns proper timezone", () => {
    expect(geocoded.getTimezone()).toEqual("America/New_York");
  });
});
