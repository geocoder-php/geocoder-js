import UniversalGeocoder from "UniversalGeocoder";
import { MapboxGeocoded, MapboxProvider } from "provider";
import ExternalLoader from "ExternalLoader";
import AdminLevel from "AdminLevel";
import setupPolly, { cleanRecording } from "../setupPolly";

describe("Mapbox Geocoder Provider", () => {
  const pollyContext = setupPolly();

  beforeEach(() => {
    cleanRecording(pollyContext);
  });

  afterEach(async () => {
    await pollyContext.polly.flush();
  });

  it("expects API Key to be required on initiation", () => {
    expect(() => new MapboxProvider(new ExternalLoader())).toThrowError(
      Error,
      'An API key is required for the Mapbox provider. Please add it in the "apiKey" option.'
    );
  });

  it("expects to not support IP geolocation", () => {
    const provider = UniversalGeocoder.createGeocoder({
      provider: "mapbox",
      useSsl: true,
      apiKey: "api_key",
    });

    expect(() =>
      provider?.geocode(
        "66.147.244.214",
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => {}
      )
    ).toThrowError(
      Error,
      "The Mapbox provider does not support IP geolocation, only location geocoding."
    );
  });

  it("receives correct geocoding results", (done) => {
    const provider = UniversalGeocoder.createGeocoder({
      provider: "mapbox",
      useSsl: true,
      apiKey: "api_key",
    });

    provider?.geocode("1600 Pennsylvania Ave, Washington, DC", (results) => {
      const geocoded = results[0];

      expect(geocoded).toBeDefined();
      expect(geocoded.getCoordinates()).toEqual({
        latitude: 38.87925,
        longitude: -76.98204,
      });
      expect(geocoded.getBounds()).toEqual(undefined);
      expect(geocoded.getFormattedAddress()).toEqual(
        "1600 Pennsylvania Ave SE, Washington, District of Columbia 20003, United States"
      );
      expect(geocoded.getStreetNumber()).toEqual("1600");
      expect(geocoded.getStreetName()).toEqual("Pennsylvania Ave SE");
      expect(geocoded.getSubLocality()).toEqual(undefined);
      expect(geocoded.getLocality()).toEqual("Washington");
      expect(geocoded.getPostalCode()).toEqual("20003");
      expect(geocoded.getRegion()).toEqual("District of Columbia");
      expect(geocoded.getAdminLevels()).toEqual([
        AdminLevel.create({ level: 2, name: "Washington" }),
        AdminLevel.create({
          level: 1,
          name: "District of Columbia",
          code: "DC",
        }),
      ]);
      expect(geocoded.getCountry()).toEqual("United States");
      expect(geocoded.getCountryCode()).toEqual("us");
      expect(geocoded.getResultType()).toEqual(["address"]);

      done();
    });
  });

  it("receives correct geocoding results with and without fuzzy match", (done) => {
    const provider = UniversalGeocoder.createGeocoder({
      provider: "mapbox",
      useSsl: true,
      apiKey: "api_key",
    });
    let numberResultsWithFuzzyMatch = -1;
    let numberResultsWithoutFuzzyMatch = -1;

    const assertion = () =>
      expect(numberResultsWithFuzzyMatch).toBeGreaterThan(
        numberResultsWithoutFuzzyMatch
      );

    provider?.geocode({ text: "wahsington", fuzzyMatch: true }, (results) => {
      numberResultsWithFuzzyMatch = results.length;
      if (numberResultsWithoutFuzzyMatch !== -1) {
        assertion();
        done();
      }
    });

    provider?.geocode({ text: "wahsington", fuzzyMatch: false }, (results) => {
      numberResultsWithoutFuzzyMatch = results.length;
      if (numberResultsWithFuzzyMatch !== -1) {
        assertion();
        done();
      }
    });
  });

  it("receives correct geodecoding results", (done) => {
    const provider = UniversalGeocoder.createGeocoder({
      provider: "mapbox",
      useSsl: true,
      apiKey: "api_key",
    });

    provider?.geodecode(48.8631507, 2.388911, (results: MapboxGeocoded[]) => {
      const geocoded = results[0];

      expect(geocoded).toBeDefined();
      expect(geocoded.getCoordinates()).toEqual({
        latitude: 48.863134,
        longitude: 2.388886,
      });
      expect(geocoded.getBounds()).toEqual(undefined);
      expect(geocoded.getFormattedAddress()).toEqual(
        "12 Avenue Gambetta, 75020 Paris, France"
      );
      expect(geocoded.getStreetNumber()).toEqual("12");
      expect(geocoded.getStreetName()).toEqual("Avenue Gambetta");
      expect(geocoded.getSubLocality()).toEqual(undefined);
      expect(geocoded.getLocality()).toEqual("Paris");
      expect(geocoded.getPostalCode()).toEqual("75020");
      expect(geocoded.getRegion()).toEqual(undefined);
      expect(geocoded.getAdminLevels()).toEqual([
        AdminLevel.create({
          level: 2,
          name: "Paris",
        }),
      ]);
      expect(geocoded.getCountry()).toEqual("France");
      expect(geocoded.getCountryCode()).toEqual("fr");
      expect(geocoded.getResultType()).toEqual(["address"]);

      done();
    });
  });

  it("receives error when the API key is bad", (done) => {
    const provider = UniversalGeocoder.createGeocoder({
      provider: "mapbox",
      useSsl: true,
      apiKey: "api_key",
    });

    provider?.geocode(
      "1600 Pennsylvania Ave, Washington, DC",
      () => {
        done();
      },
      (error) => {
        expect(error.message).toEqual(
          "Received HTTP status code 401 when attempting geocoding request."
        );
        done();
      }
    );
  });
});
