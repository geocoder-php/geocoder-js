import {
  GoogleMapsGeocoded,
  GoogleMapsProvider,
  GoogleMapsResult,
} from "provider";
import ExternalLoader from "ExternalLoader";
import AdminLevel from "AdminLevel";

describe("Google Maps Geocoder Provider raw result to Geocoded mapping", () => {
  let geocoded: GoogleMapsGeocoded;

  const stubGoogleMapsResult: GoogleMapsResult[] = [
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
          long_name: "Northwest Washington",
          short_name: "Northwest Washington",
          types: ["neighborhood", "political"],
        },
        {
          long_name: "Washington",
          short_name: "Washington",
          types: ["locality", "political"],
        },
        {
          long_name: "District of Columbia",
          short_name: "DC",
          types: ["administrative_area_level_1", "political"],
        },
        {
          long_name: "United States",
          short_name: "US",
          types: ["country", "political"],
        },
        {
          long_name: "20500",
          short_name: "20500",
          types: ["postal_code"],
        },
      ],
      formatted_address:
        "1600 Pennsylvania Avenue NW, Washington, DC 20500, USA",
      geometry: {
        bounds: {
          northeast: {
            lat: 38.8979044,
            lng: -77.0355124,
          },
          southwest: {
            lat: 38.8973063,
            lng: -77.03795749999999,
          },
        },
        location: {
          lat: 38.8976633,
          lng: -77.03657389999999,
        },
        location_type: "ROOFTOP",
        viewport: {
          northeast: {
            lat: 38.8989543302915,
            lng: -77.03538596970849,
          },
          southwest: {
            lat: 38.8962563697085,
            lng: -77.03808393029151,
          },
        },
      },
      place_id: "ChIJGVtI4by3t4kRr51d_Qm_x58",
      types: ["establishment", "point_of_interest", "premise"],
    },
  ];

  beforeEach(() => {
    geocoded = GoogleMapsProvider.mapToGeocoded(stubGoogleMapsResult[0]);
  });

  it("receives results from the Google Maps geocoder", () => {
    expect(geocoded).toBeDefined();
  });

  it("expects API Key or client ID to be required on initiation", () => {
    expect(() => new GoogleMapsProvider(new ExternalLoader())).toThrowError(
      Error,
      'An API key or a client ID is required for the Google Maps provider. Please add it in the "apiKey" or the "clientId" option.'
    );
  });

  it("expects country codes option to have only one value when set", () => {
    expect(
      () =>
        new GoogleMapsProvider(new ExternalLoader(), {
          apiKey: "api_key",
          countryCodes: ["fr", "uk"],
        })
    ).toThrowError(
      Error,
      'The "countryCodes" option must have only one country code top-level domain.'
    );
  });

  it("maps coordinates correctly", () => {
    expect(geocoded.getCoordinates()).toEqual([38.8976633, -77.0365739]);
  });

  it("maps bounds correctly", () => {
    expect(geocoded.getBounds()).toEqual([
      38.8973063,
      -77.03795749999999,
      38.8979044,
      -77.0355124,
    ]);
  });

  it("maps formatted address correctly", () => {
    expect(geocoded.getFormattedAddress()).toEqual(
      "1600 Pennsylvania Avenue NW, Washington, DC 20500, USA"
    );
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
      AdminLevel.create({ level: 1, name: "District of Columbia", code: "DC" }),
    ]);
  });

  it("maps country correctly", () => {
    expect(geocoded.getCountry()).toEqual("United States");
  });

  it("maps country code correctly", () => {
    expect(geocoded.getCountryCode()).toEqual("US");
  });

  it("maps place ID correctly", () => {
    expect(geocoded.getPlaceId()).toEqual("ChIJGVtI4by3t4kRr51d_Qm_x58");
  });

  it("maps result type correctly", () => {
    expect(geocoded.getResultType()).toEqual([
      "establishment",
      "point_of_interest",
      "premise",
    ]);
  });

  it("maps location type correctly", () => {
    expect(geocoded.getLocationType()).toEqual("ROOFTOP");
  });

  it("maps political correctly", () => {
    expect(geocoded.getPolitical()).toEqual("United States");
  });

  it("maps neighborhood correctly", () => {
    expect(geocoded.getNeighborhood()).toEqual("Northwest Washington");
  });
});
