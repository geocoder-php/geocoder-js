import UniversalGeocoder from "UniversalGeocoder";
import { OpenCageGeocoded, OpenCageProvider } from "provider";
import ExternalLoader from "ExternalLoader";
import AdminLevel from "AdminLevel";
import setupPolly, { cleanRecording } from "../setupPolly";

describe("OpenCage Geocoder Provider", () => {
  const pollyContext = setupPolly();

  beforeEach(() => {
    cleanRecording(pollyContext);
  });

  afterEach(async () => {
    await pollyContext.polly.flush();
  });

  it("expects API Key to be required on initiation", () => {
    expect(() => new OpenCageProvider(new ExternalLoader())).toThrowError(
      Error,
      'An API key is required for the OpenCage provider. Please add it in the "apiKey" option.'
    );
  });

  it("expects to not support IP geolocation", () => {
    const provider = UniversalGeocoder.createGeocoder({
      provider: "opencage",
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
      "The OpenCage provider does not support IP geolocation, only location geocoding."
    );
  });

  it("receives correct geocoding results", (done) => {
    const provider = UniversalGeocoder.createGeocoder({
      provider: "opencage",
      useSsl: true,
      apiKey: "api_key",
    });

    provider?.geocode("1600 Pennsylvania Ave, Washington, DC", (results) => {
      const geocoded = results[0];

      expect(geocoded).toBeDefined();
      expect(geocoded.getCoordinates()).toEqual({
        latitude: 38.8636383,
        longitude: -76.9463651,
      });
      expect(geocoded.getBounds()).toEqual({
        latitudeSW: 38.8633822,
        longitudeSW: -76.9467576,
        latitudeNE: 38.8637409,
        longitudeNE: -76.945632,
      });
      expect(geocoded.getFormattedAddress()).toEqual(
        "Pennsylvania Avenue, Washington, DC 20746-8001, United States of America"
      );
      expect(geocoded.getStreetNumber()).toEqual(undefined);
      expect(geocoded.getStreetName()).toEqual("Pennsylvania Avenue");
      expect(geocoded.getSubLocality()).toEqual(undefined);
      expect(geocoded.getLocality()).toEqual("Dillon Park");
      expect(geocoded.getPostalCode()).toEqual("20746-8001");
      expect(geocoded.getRegion()).toEqual("District of Columbia");
      expect(geocoded.getAdminLevels()).toEqual([
        AdminLevel.create({
          level: 1,
          name: "District of Columbia",
          code: "DC",
        }),
        AdminLevel.create({ level: 2, name: "Prince George's County" }),
      ]);
      expect(geocoded.getCountry()).toEqual("United States of America");
      expect(geocoded.getCountryCode()).toEqual("us");
      expect(geocoded.getTimezone()).toEqual("America/New_York");
      expect(geocoded.getCallingCode()).toEqual(1);
      expect(geocoded.getFlag()).toEqual("🇺🇸");
      expect(geocoded.getMgrs()).toEqual("18SUJ3113003444");
      expect(geocoded.getMaidenhead()).toEqual("FM18mu67kg");
      expect(geocoded.getGeohash()).toEqual("dqcm14cm5er8th99jt7w");
      expect(geocoded.getWhat3words()).toEqual("bottom.grace.mass");

      done();
    });
  });

  it("receives correct geodecoding results", (done) => {
    const provider = UniversalGeocoder.createGeocoder({
      provider: "opencage",
      useSsl: true,
      apiKey: "api_key",
    });

    provider?.geodecode(48.8631507, 2.388911, (results: OpenCageGeocoded[]) => {
      const geocoded = results[0];

      expect(geocoded).toBeDefined();
      expect(geocoded.getCoordinates()).toEqual({
        latitude: 48.863116,
        longitude: 2.38878,
      });
      expect(geocoded.getBounds()).toEqual(undefined);
      expect(geocoded.getFormattedAddress()).toEqual(
        "8 Avenue Gambetta, 75020 Paris, France"
      );
      expect(geocoded.getStreetNumber()).toEqual("8");
      expect(geocoded.getStreetName()).toEqual("Avenue Gambetta");
      expect(geocoded.getSubLocality()).toEqual(undefined);
      expect(geocoded.getLocality()).toEqual("Paris");
      expect(geocoded.getPostalCode()).toEqual("75020");
      expect(geocoded.getRegion()).toEqual("Île-de-France");
      expect(geocoded.getAdminLevels()).toEqual([
        AdminLevel.create({
          level: 1,
          name: "Île-de-France",
          code: "IDF",
        }),
      ]);
      expect(geocoded.getCountry()).toEqual("France");
      expect(geocoded.getCountryCode()).toEqual("fr");
      expect(geocoded.getTimezone()).toEqual("Europe/Paris");
      expect(geocoded.getCallingCode()).toEqual(33);
      expect(geocoded.getFlag()).toEqual("🇫🇷");
      expect(geocoded.getMgrs()).toEqual("31UDQ5517112419");
      expect(geocoded.getMaidenhead()).toEqual("JN18eu67pd");
      expect(geocoded.getGeohash()).toEqual("u09tyr72q952wcz9bf5x");
      expect(geocoded.getWhat3words()).toEqual("snatched.juniors.tedious");

      done();
    });
  });

  it("receives error when the quota is exceeded", (done) => {
    const provider = UniversalGeocoder.createGeocoder({
      provider: "opencage",
      useSsl: true,
      // see https://opencagedata.com/api#testingkeys
      apiKey: "4372eff77b8343cebfc843eb4da4ddc4",
    });

    provider?.geocode(
      "1600 Pennsylvania Ave, Washington, DC",
      () => {
        done();
      },
      (error) => {
        expect(error.message).toEqual("Quota exceeded (402): quota exceeded");
        done();
      }
    );
  });

  it("receives error when suspended", (done) => {
    const provider = UniversalGeocoder.createGeocoder({
      provider: "opencage",
      useSsl: true,
      // see https://opencagedata.com/api#testingkeys
      apiKey: "2e10e5e828262eb243ec0b54681d699a",
    });

    provider?.geocode(
      "1600 Pennsylvania Ave, Washington, DC",
      () => {
        done();
      },
      (error) => {
        expect(error.message).toEqual("Forbidden (403): suspended");
        done();
      }
    );
  });

  it("receives error when the IP address is rejected", (done) => {
    const provider = UniversalGeocoder.createGeocoder({
      provider: "opencage",
      useSsl: true,
      // see https://opencagedata.com/api#testingkeys
      apiKey: "6c79ee8e1ca44ad58ad1fc493ba9542f",
    });

    provider?.geocode(
      "1600 Pennsylvania Ave, Washington, DC",
      () => {
        done();
      },
      (error) => {
        expect(error.message).toEqual("Forbidden (403): IP address rejected");
        done();
      }
    );
  });

  it("receives error when requesting too quickly", (done) => {
    const provider = UniversalGeocoder.createGeocoder({
      provider: "opencage",
      useSsl: true,
      // see https://opencagedata.com/api#testingkeys
      apiKey: "d6d0f0065f4348a4bdfe4587ba02714b",
    });

    provider?.geocode(
      "1600 Pennsylvania Ave, Washington, DC",
      () => {
        done();
      },
      (error) => {
        expect(error.message).toEqual(
          "Too many requests (429): requesting too quickly"
        );
        done();
      }
    );
  });
});
