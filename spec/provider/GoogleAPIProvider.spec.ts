import { GoogleAPIProvider, GoogleApiResult } from "provider";
import ExternalLoader from "ExternalLoader";
import Geocoded from "Geocoded";

describe("Google API Geocoder Provider raw result to Geocoded mapping", () => {
  let geocoded: Geocoded;

  const stubGoogleApiResult: GoogleApiResult[] = [
    {
      address_components: [
        {
          long_name: "1600",
          short_name: "1600",
          types: ["street_number"],
        },
        {
          long_name: "Pennsylvania Avenue Northwest",
          short_name: "Pennsylvania Avenue NW",
          types: ["route"],
        },
        {
          long_name: "Washington, D.C.",
          short_name: "Washington, D.C.",
          types: ["locality"],
        },
        {
          long_name: "District of Columbia",
          short_name: "DC",
          types: ["administrative_area_level_1"],
        },
        {
          long_name: "20050",
          short_name: "20050",
          types: ["postal_code"],
        },
        {
          long_name: "United States",
          short_name: "US",
          types: ["country"],
        },
      ],
      formatted_address:
        "1600 Pennsylvania Avenue Northwest, Washington, DC 20050",
      geometry: {
        location: {
          lat: 38.8978378,
          lng: -77.0365123,
        },
        bounds: {
          southwest: {
            lat: 38.89380528242933,
            lng: -77.04317326462667,
          },
          northeast: {
            lat: 38.90153071757068,
            lng: -77.02993873537334,
          },
        },
      },
    },
  ];

  beforeEach(() => {
    geocoded = GoogleAPIProvider.mapToGeocoded(stubGoogleApiResult[0]);
  });

  it("receives results from the Google API geocoder", () => {
    expect(geocoded).toBeDefined();
  });

  it("expects API Key to be required on initiation", () => {
    expect(() => new GoogleAPIProvider(new ExternalLoader())).toThrowError(
      Error,
      'An API key is required for the Google API provider. Please add it in the "apiKey" option.'
    );
  });

  it("maps coordinates correctly", () => {
    expect(geocoded.getCoordinates()).toEqual([38.8978378, -77.0365123]);
  });

  it("maps bounds correctly", () => {
    expect(geocoded.getBounds()).toEqual([
      38.89380528242933,
      -77.04317326462667,
      38.90153071757068,
      -77.02993873537334,
    ]);
  });

  it("maps street number correctly", () => {
    expect(geocoded.getStreetNumber()).toEqual("1600");
  });

  it("maps street name correctly", () => {
    expect(geocoded.getStreetName()).toEqual("Pennsylvania Avenue Northwest");
  });

  it("maps sublocality correctly", () => {
    expect(geocoded.getSubLocality()).toEqual(undefined);
  });

  it("maps locality correctly", () => {
    expect(geocoded.getLocality()).toEqual("Washington, D.C.");
  });

  it("maps postal code correctly", () => {
    expect(geocoded.getPostalCode()).toEqual("20050");
  });

  it("maps region correctly", () => {
    expect(geocoded.getRegion()).toEqual("District of Columbia");
  });

  it("maps country correctly", () => {
    expect(geocoded.getCountry()).toEqual("United States");
  });

  it("maps country code correctly", () => {
    expect(geocoded.getCountryCode()).toEqual("US");
  });
});
