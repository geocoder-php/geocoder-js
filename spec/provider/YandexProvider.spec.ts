import UniversalGeocoder from "UniversalGeocoder";
import { YandexGeocoded, YandexProvider } from "provider";
import ExternalLoader from "ExternalLoader";
import AdminLevel from "AdminLevel";
import setupPolly, { cleanRecording } from "../setupPolly";

describe("Yandex Geocoder Provider", () => {
  const pollyContext = setupPolly();

  beforeEach(() => {
    cleanRecording(pollyContext);
  });

  afterEach(async () => {
    await pollyContext.polly.flush();
  });

  it("expects API Key to be required on initiation", () => {
    expect(() => new YandexProvider(new ExternalLoader())).toThrowError(
      Error,
      'An API key is required for the Yandex provider. Please add it in the "apiKey" option.'
    );
  });

  it("expects to not support IP geolocation", () => {
    const provider = UniversalGeocoder.createGeocoder({
      provider: "yandex",
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
      "The Yandex provider does not support IP geolocation, only location geocoding."
    );
  });

  it("receives correct geocoding results", (done) => {
    const provider = UniversalGeocoder.createGeocoder({
      provider: "yandex",
      useSsl: true,
      apiKey: "api_key",
    });

    provider?.geocode(
      { text: "1600 Pennsylvania Ave, Washington, DC", locale: "en_US" },
      (results: YandexGeocoded[]) => {
        const geocoded = results[0];

        expect(geocoded).toBeDefined();
        expect(geocoded.getCoordinates()).toEqual([38.895512, -77.033608]);
        expect(geocoded.getBounds()).toEqual({
          latitude1: 38.890612,
          longitude1: -77.058105,
          latitude2: 38.905248,
          longitude2: -77.012426,
        });
        expect(geocoded.getFormattedAddress()).toEqual(undefined);
        expect(geocoded.getStreetNumber()).toEqual(undefined);
        expect(geocoded.getStreetName()).toEqual(
          "Pennsylvania Avenue Northwest"
        );
        expect(geocoded.getSubLocality()).toEqual(undefined);
        expect(geocoded.getLocality()).toEqual("Washington");
        expect(geocoded.getPostalCode()).toEqual(undefined);
        expect(geocoded.getRegion()).toEqual("District of Columbia");
        expect(geocoded.getAdminLevels()).toEqual([
          AdminLevel.create({
            level: 1,
            name: "District of Columbia",
          }),
        ]);
        expect(geocoded.getCountry()).toEqual("United States of America");
        expect(geocoded.getCountryCode()).toEqual("US");
        expect(geocoded.getLocationType()).toEqual("street");
        expect(geocoded.getPrecision()).toEqual("street");

        done();
      }
    );
  });

  it("receives correct geodecoding results", (done) => {
    const provider = UniversalGeocoder.createGeocoder({
      provider: "yandex",
      useSsl: true,
      apiKey: "api_key",
    });

    provider?.geodecode(
      { latitude: 48.8631507, longitude: 2.388911, locale: "en_US" },
      (results: YandexGeocoded[]) => {
        const geocoded = results[0];

        expect(geocoded).toBeDefined();
        expect(geocoded.getCoordinates()).toEqual([48.8631, 2.388899]);
        expect(geocoded.getBounds()).toEqual({
          latitude1: 48.860391,
          longitude1: 2.384794,
          latitude2: 48.865808,
          longitude2: 2.393004,
        });
        expect(geocoded.getFormattedAddress()).toEqual(undefined);
        expect(geocoded.getStreetNumber()).toEqual("10");
        expect(geocoded.getStreetName()).toEqual("Avenue Gambetta");
        expect(geocoded.getSubLocality()).toEqual("20e Arrondissement");
        expect(geocoded.getLocality()).toEqual("Paris");
        expect(geocoded.getPostalCode()).toEqual(undefined);
        expect(geocoded.getRegion()).toEqual("Île-de-France");
        expect(geocoded.getAdminLevels()).toEqual([
          AdminLevel.create({
            level: 1,
            name: "Île-de-France",
          }),
        ]);
        expect(geocoded.getCountry()).toEqual("France");
        expect(geocoded.getCountryCode()).toEqual("FR");
        expect(geocoded.getLocationType()).toEqual("house");
        expect(geocoded.getPrecision()).toEqual("exact");

        done();
      }
    );
  });

  it("receives error when the API key is bad", (done) => {
    const provider = UniversalGeocoder.createGeocoder({
      provider: "yandex",
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
