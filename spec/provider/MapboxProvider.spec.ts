import { MapboxGeocoded, MapboxProvider, MapboxResult } from "provider";
import ExternalLoader from "ExternalLoader";
import AdminLevel from "AdminLevel";

describe("Mapbox Geocoder Provider raw result to Geocoded mapping", () => {
  let geocoded: MapboxGeocoded;

  const stubMapboxResult: MapboxResult[] = [
    {
      id: "address.8134540196038770",
      type: "Feature",
      place_type: ["address"],
      relevance: 1,
      properties: { accuracy: "rooftop" },
      text: "Pennsylvania Avenue Northwest",
      place_name:
        "1600 Pennsylvania Avenue Northwest, Washington, District of Columbia 20500, United States",
      matching_place_name:
        "1600 Pennsylvania Avenue Northwest, Washington, DC 20500, United States",
      center: [-77.036547, 38.897675],
      geometry: { type: "Point", coordinates: [-77.036547, 38.897675] },
      address: "1600",
      context: [
        { id: "neighborhood.291451", text: "Downtown" },
        { id: "postcode.8134540196038770", text: "20500" },
        { id: "place.7673410831246050", wikidata: "Q61", text: "Washington" },
        {
          id: "region.14064402149979320",
          wikidata: "Q3551781",
          short_code: "US-DC",
          text: "District of Columbia",
        },
        {
          id: "country.19678805456372290",
          short_code: "us",
          wikidata: "Q30",
          text: "United States",
        },
      ],
    },
  ];

  beforeEach(() => {
    geocoded = MapboxProvider.mapToGeocoded(stubMapboxResult[0]);
  });

  it("receives results from the Mapbox geocoder", () => {
    expect(geocoded).toBeDefined();
  });

  it("expects API Key to be required on initiation", () => {
    expect(() => new MapboxProvider(new ExternalLoader())).toThrowError(
      Error,
      'An API key is required for the Mapbox provider. Please add it in the "apiKey" option.'
    );
  });

  it("maps coordinates correctly", () => {
    expect(geocoded.getCoordinates()).toEqual([38.897675, -77.036547]);
  });

  it("maps formatted address correctly", () => {
    expect(geocoded.getFormattedAddress()).toEqual(
      "1600 Pennsylvania Avenue Northwest, Washington, District of Columbia 20500, United States"
    );
  });

  it("maps street number correctly", () => {
    expect(geocoded.getStreetNumber()).toEqual("1600");
  });

  it("maps street name correctly", () => {
    expect(geocoded.getStreetName()).toEqual("Pennsylvania Avenue Northwest");
  });

  it("maps locality correctly", () => {
    expect(geocoded.getLocality()).toEqual("Washington");
  });

  it("maps postal code correctly", () => {
    expect(geocoded.getPostalCode()).toEqual("20500");
  });

  it("maps region correctly", () => {
    expect(geocoded.getRegion()).toEqual("District of Columbia");
  });

  it("maps admin levels correctly", () => {
    expect(geocoded.getAdminLevels()).toEqual([
      AdminLevel.create({ level: 2, name: "Washington" }),
      AdminLevel.create({ level: 1, name: "District of Columbia", code: "DC" }),
    ]);
  });

  it("maps country correctly", () => {
    expect(geocoded.getCountry()).toEqual("United States");
  });

  it("maps country code correctly", () => {
    expect(geocoded.getCountryCode()).toEqual("us");
  });

  it("maps result type correctly", () => {
    expect(geocoded.getResultType()).toEqual(["address"]);
  });
});
