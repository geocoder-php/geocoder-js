import UniversalGeocoder from "UniversalGeocoder";
import setupPolly, { cleanRecording } from "../setupPolly";

describe("Yandex Geocoder Provider", () => {
  const pollyContext = setupPolly();

  beforeEach(() => {
    cleanRecording(pollyContext);
  });

  afterEach(async () => {
    await pollyContext.polly.flush();
  });

  it("receives correct geocoding results", (done) => {
    const provider = UniversalGeocoder.createGeocoder({
      provider: "yandex",
      useSsl: true,
      apiKey: "api_key",
    });

    provider?.geocode(
      { text: "1600 Pennsylvania Ave, Washington, DC", locale: "en_US" },
      (results) => {
        const geocoded = results[0];

        expect(geocoded).toBeDefined();
        expect(geocoded.getCoordinates()).toEqual([38.895512, -77.033608]);
        expect(geocoded.getBounds()).toEqual([
          38.890612,
          -77.058105,
          38.905248,
          -77.012426,
        ]);
        expect(geocoded.getFormattedAddress()).toEqual(undefined);
        expect(geocoded.getStreetNumber()).toEqual(undefined);
        expect(geocoded.getStreetName()).toEqual(
          "Pennsylvania Avenue Northwest"
        );
        expect(geocoded.getSubLocality()).toEqual(undefined);
        expect(geocoded.getLocality()).toEqual("Washington");
        expect(geocoded.getPostalCode()).toEqual(undefined);
        expect(geocoded.getRegion()).toEqual("District of Columbia");
        expect(geocoded.getAdminLevels()).toEqual([]);
        expect(geocoded.getCountry()).toEqual("United States of America");
        expect(geocoded.getCountryCode()).toEqual("US");

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
      (results) => {
        const geocoded = results[0];

        expect(geocoded).toBeDefined();
        expect(geocoded.getCoordinates()).toEqual([48.8631, 2.388899]);
        expect(geocoded.getBounds()).toEqual([
          48.860391,
          2.384794,
          48.865808,
          2.393004,
        ]);
        expect(geocoded.getFormattedAddress()).toEqual(undefined);
        expect(geocoded.getStreetNumber()).toEqual("10");
        expect(geocoded.getStreetName()).toEqual("Avenue Gambetta");
        expect(geocoded.getSubLocality()).toEqual("20e Arrondissement");
        expect(geocoded.getLocality()).toEqual("Paris");
        expect(geocoded.getPostalCode()).toEqual(undefined);
        expect(geocoded.getRegion()).toEqual("Île-de-France");
        expect(geocoded.getAdminLevels()).toEqual([]);
        expect(geocoded.getCountry()).toEqual("France");
        expect(geocoded.getCountryCode()).toEqual("FR");

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
