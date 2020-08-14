import UniversalGeocoder from "UniversalGeocoder";
import { MapquestProvider } from "provider";
import ExternalLoader from "ExternalLoader";
import Geocoded from "Geocoded";
import setupPolly, { cleanRecording } from "../setupPolly";

describe("MapQuest Geocoder Provider", () => {
  const pollyContext = setupPolly();

  beforeEach(() => {
    cleanRecording(pollyContext);
  });

  afterEach(async () => {
    await pollyContext.polly.flush();
  });

  it("expects API Key to be required on initiation", () => {
    expect(() => new MapquestProvider(new ExternalLoader())).toThrowError(
      Error,
      'An API key is required for the MapQuest provider. Please add it in the "apiKey" option.'
    );
  });

  it("receives correct geocoding results", (done) => {
    const provider = UniversalGeocoder.createGeocoder({
      provider: "mapquest",
      useSsl: true,
      apiKey: "api_key",
    });

    provider?.geocode(
      "1600 Pennsylvania Ave, Washington, DC",
      (results: Geocoded[]) => {
        const geocoded = results[0];

        expect(geocoded).toBeDefined();
        expect(geocoded.getCoordinates()).toEqual([38.895206, -77.036515]);
        expect(geocoded.getBounds()).toEqual([
          undefined,
          undefined,
          undefined,
          undefined,
        ]);
        expect(geocoded.getFormattedAddress()).toEqual(undefined);
        expect(geocoded.getStreetNumber()).toEqual(undefined);
        expect(geocoded.getStreetName()).toEqual("1600 Pennsylvania Ave");
        expect(geocoded.getSubLocality()).toEqual("");
        expect(geocoded.getLocality()).toEqual("Washington");
        expect(geocoded.getPostalCode()).toEqual("");
        expect(geocoded.getRegion()).toEqual("District Of Columbia");
        expect(geocoded.getAdminLevels()).toEqual([]);
        expect(geocoded.getCountry()).toEqual("US");
        expect(geocoded.getCountryCode()).toEqual("US");

        done();
      }
    );
  });

  it("receives correct geodecoding results", (done) => {
    const provider = UniversalGeocoder.createGeocoder({
      provider: "mapquest",
      useSsl: true,
      apiKey: "api_key",
    });

    provider?.geodecode(48.8631507, 2.388911, (results: Geocoded[]) => {
      const geocoded = results[0];

      expect(geocoded).toBeDefined();
      expect(geocoded.getCoordinates()).toEqual([48.863116, 2.38878]);
      expect(geocoded.getBounds()).toEqual([
        undefined,
        undefined,
        undefined,
        undefined,
      ]);
      expect(geocoded.getFormattedAddress()).toEqual(undefined);
      expect(geocoded.getStreetNumber()).toEqual(undefined);
      expect(geocoded.getStreetName()).toEqual("8 Avenue Gambetta");
      expect(geocoded.getSubLocality()).toEqual("");
      expect(geocoded.getLocality()).toEqual("Paris");
      expect(geocoded.getPostalCode()).toEqual("75020");
      expect(geocoded.getRegion()).toEqual("");
      expect(geocoded.getAdminLevels()).toEqual([]);
      expect(geocoded.getCountry()).toEqual("FR");
      expect(geocoded.getCountryCode()).toEqual("FR");

      done();
    });
  });

  it("receives error when the API key is bad", (done) => {
    const provider = UniversalGeocoder.createGeocoder({
      provider: "mapquest",
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
          "Received HTTP status code 403 when attempting geocoding request."
        );
        done();
      }
    );
  });
});
