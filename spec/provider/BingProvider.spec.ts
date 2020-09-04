import GeocoderJS from "GeocoderJS";
import { BingProvider } from "provider";
import ExternalLoader from "ExternalLoader";
import Geocoded from "Geocoded";
import setupPolly, { cleanRecording } from "../setupPolly";

describe("Bing Geocoder Provider", () => {
  const pollyContext = setupPolly();

  beforeEach(() => {
    cleanRecording(pollyContext);
  });

  afterEach(async () => {
    await pollyContext.polly.flush();
  });

  it("expects API Key to be required on initiation", () => {
    expect(() => new BingProvider(new ExternalLoader())).toThrowError(
      Error,
      'An API key is required for the Bing provider. Please add it in the "apiKey" option.'
    );
  });

  it("expects to not support IP geolocation", () => {
    const provider = GeocoderJS.createGeocoder({
      provider: "bing",
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
      "The Bing provider does not support IP geolocation, only location geocoding."
    );
  });

  it("receives correct geocoding results", (done) => {
    const provider = GeocoderJS.createGeocoder({
      provider: "bing",
      useSsl: true,
      apiKey: "api_key",
    });

    provider?.geocode(
      "1600 Pennsylvania Ave, Washington, DC",
      (results: Geocoded[]) => {
        const geocoded = results[0];

        expect(geocoded).toBeDefined();
        expect(geocoded.getCoordinates()).toEqual([38.897668, -77.036556]);
        expect(geocoded.getBounds()).toEqual([
          38.89380528242933,
          -77.04317326462667,
          38.90153071757068,
          -77.02993873537334,
        ]);
        expect(geocoded.getFormattedAddress()).toEqual(
          "1600 Pennsylvania Ave NW, Washington, DC 20006"
        );
        expect(geocoded.getStreetNumber()).toEqual(undefined);
        expect(geocoded.getStreetName()).toEqual("1600 Pennsylvania Ave NW");
        expect(geocoded.getSubLocality()).toEqual(undefined);
        expect(geocoded.getLocality()).toEqual("Washington");
        expect(geocoded.getPostalCode()).toEqual("20006");
        expect(geocoded.getRegion()).toEqual("DC");
        expect(geocoded.getAdminLevels()).toEqual([]);
        expect(geocoded.getCountry()).toEqual("United States");
        expect(geocoded.getCountryCode()).toEqual(undefined);

        done();
      }
    );
  });

  it("receives correct geodecoding results", (done) => {
    const provider = GeocoderJS.createGeocoder({
      provider: "bing",
      useSsl: true,
      apiKey: "api_key",
    });

    provider?.geodecode(48.8631507, 2.388911, (results: Geocoded[]) => {
      const geocoded = results[0];

      expect(geocoded).toBeDefined();
      expect(geocoded.getCoordinates()).toEqual([48.8631093, 2.3887809]);
      expect(geocoded.getBounds()).toEqual([
        48.85924658242932,
        2.380952653445271,
        48.866972017570674,
        2.396609146554729,
      ]);
      expect(geocoded.getFormattedAddress()).toEqual(
        "8 Avenue Gambetta, 75020 Paris"
      );
      expect(geocoded.getStreetNumber()).toEqual(undefined);
      expect(geocoded.getStreetName()).toEqual("8 Avenue Gambetta");
      expect(geocoded.getSubLocality()).toEqual(undefined);
      expect(geocoded.getLocality()).toEqual("Paris");
      expect(geocoded.getPostalCode()).toEqual("75020");
      expect(geocoded.getRegion()).toEqual("Île-de-France");
      expect(geocoded.getAdminLevels()).toEqual([]);
      expect(geocoded.getCountry()).toEqual("France");
      expect(geocoded.getCountryCode()).toEqual(undefined);

      done();
    });
  });

  it("receives error when the API key is bad", (done) => {
    const provider = GeocoderJS.createGeocoder({
      provider: "bing",
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
