import UniversalGeocoder from "UniversalGeocoder";
import Geocoded from "Geocoded";
import AdminLevel from "AdminLevel";
import setupPolly, { cleanRecording } from "../setupPolly";

const expectGeocodedYandex = (geocoded: Geocoded) => {
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
  expect(geocoded.getStreetName()).toEqual("Pennsylvania Avenue Northwest");
  expect(geocoded.getSubLocality()).toEqual(undefined);
  expect(geocoded.getLocality()).toEqual("Washington");
  expect(geocoded.getPostalCode()).toEqual(undefined);
  expect(geocoded.getRegion()).toEqual("District of Columbia");
  expect(geocoded.getAdminLevels()).toEqual([]);
  expect(geocoded.getCountry()).toEqual("United States of America");
  expect(geocoded.getCountryCode()).toEqual("US");
};

const expectGeodecodedYandex = (geocoded: Geocoded) => {
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
};

const expectGeocodedOpenStreetMap = (geocoded: Geocoded) => {
  expect(geocoded).toBeDefined();
  expect(geocoded.getCoordinates()).toEqual([38.8636383, -76.9463651]);
  expect(geocoded.getBounds()).toEqual([
    38.8633822,
    -76.9467576,
    38.8637409,
    -76.945632,
  ]);
  expect(geocoded.getFormattedAddress()).toEqual(undefined);
  expect(geocoded.getStreetNumber()).toEqual(undefined);
  expect(geocoded.getStreetName()).toEqual("Pennsylvania Avenue");
  expect(geocoded.getSubLocality()).toEqual(undefined);
  expect(geocoded.getLocality()).toEqual("Dillon Park");
  expect(geocoded.getPostalCode()).toEqual("20746-8001");
  expect(geocoded.getRegion()).toEqual("Washington, D.C.");
  expect(geocoded.getAdminLevels()).toEqual([
    AdminLevel.create({ level: 1, name: "Washington, D.C." }),
    AdminLevel.create({ level: 2, name: "Prince George's County" }),
  ]);
  expect(geocoded.getCountry()).toEqual("United States of America");
  expect(geocoded.getCountryCode()).toEqual("us");
};

const expectGeodecodedOpenStreetMap = (geocoded: Geocoded) => {
  expect(geocoded.getCoordinates()).toEqual([
    48.863744499999996,
    2.3911562136123106,
  ]);
  expect(geocoded.getBounds()).toEqual([
    48.8625929,
    2.3877078,
    48.8648832,
    2.3956964,
  ]);
  expect(geocoded.getFormattedAddress()).toEqual(undefined);
  expect(geocoded.getStreetNumber()).toEqual(undefined);
  expect(geocoded.getStreetName()).toEqual(undefined);
  expect(geocoded.getSubLocality()).toEqual("Quartier du Père-Lachaise");
  expect(geocoded.getLocality()).toEqual("Paris");
  expect(geocoded.getPostalCode()).toEqual("75020");
  expect(geocoded.getRegion()).toEqual("Ile-de-France");
  expect(geocoded.getAdminLevels()).toEqual([
    AdminLevel.create({ level: 1, name: "Ile-de-France" }),
    AdminLevel.create({ level: 2, name: "Paris" }),
  ]);
  expect(geocoded.getCountry()).toEqual("France");
  expect(geocoded.getCountryCode()).toEqual("fr");
};

describe("Chain Geocoder Provider", () => {
  const pollyContext = setupPolly();

  beforeEach(() => {
    cleanRecording(pollyContext);
  });

  afterEach(async () => {
    await pollyContext.polly.flush();
  });

  it("receives correct geocoding results (first provider OK)", (done) => {
    const yandexGeocoder = UniversalGeocoder.createGeocoder({
      provider: "yandex",
      useSsl: true,
      apiKey: "api_key",
    });
    const openStreetMapGeocoder = UniversalGeocoder.createGeocoder({
      provider: "openstreetmap",
      useSsl: true,
      userAgent: "Universal Geocoder Example",
    });
    const provider = UniversalGeocoder.createGeocoder({
      provider: "chain",
      providers: [yandexGeocoder, openStreetMapGeocoder],
    });

    provider?.geocode(
      { text: "1600 Pennsylvania Ave, Washington, DC", locale: "en_US" },
      (results: Geocoded[]) => {
        const geocoded = results[0];

        expectGeocodedYandex(geocoded);

        done();
      }
    );
  });

  it("receives correct geocoding results (first provider KO)", (done) => {
    const yandexGeocoder = UniversalGeocoder.createGeocoder({
      provider: "yandex",
      useSsl: true,
      apiKey: "api_key",
    });
    const openStreetMapGeocoder = UniversalGeocoder.createGeocoder({
      provider: "openstreetmap",
      useSsl: true,
      userAgent: "Universal Geocoder Example",
    });
    const provider = UniversalGeocoder.createGeocoder({
      provider: "chain",
      providers: [yandexGeocoder, openStreetMapGeocoder],
    });

    provider?.geocode(
      { text: "1600 Pennsylvania Ave, Washington, DC", locale: "en_US" },
      (results: Geocoded[]) => {
        const geocoded = results[0];

        expectGeocodedOpenStreetMap(geocoded);

        done();
      }
    );
  });

  it("receives correct geocoding results (parallelize - first provider OK)", (done) => {
    const yandexGeocoder = UniversalGeocoder.createGeocoder({
      provider: "yandex",
      useSsl: true,
      apiKey: "api_key",
    });
    const openStreetMapGeocoder = UniversalGeocoder.createGeocoder({
      provider: "openstreetmap",
      useSsl: true,
      userAgent: "Universal Geocoder Example",
    });
    const provider = UniversalGeocoder.createGeocoder({
      provider: "chain",
      providers: [yandexGeocoder, openStreetMapGeocoder],
      parallelize: true,
    });

    provider?.geocode(
      { text: "1600 Pennsylvania Ave, Washington, DC", locale: "en_US" },
      (results: Geocoded[]) => {
        const geocoded = results[0];

        expectGeocodedYandex(geocoded);

        done();
      }
    );
  });

  it("receives correct geocoding results (parallelize - first provider KO)", (done) => {
    const yandexGeocoder = UniversalGeocoder.createGeocoder({
      provider: "yandex",
      useSsl: true,
      apiKey: "api_key",
    });
    const openStreetMapGeocoder = UniversalGeocoder.createGeocoder({
      provider: "openstreetmap",
      useSsl: true,
      userAgent: "Universal Geocoder Example",
    });
    const provider = UniversalGeocoder.createGeocoder({
      provider: "chain",
      providers: [yandexGeocoder, openStreetMapGeocoder],
      parallelize: true,
    });

    provider?.geocode(
      { text: "1600 Pennsylvania Ave, Washington, DC", locale: "en_US" },
      (results: Geocoded[]) => {
        const geocoded = results[0];

        expectGeocodedOpenStreetMap(geocoded);

        done();
      }
    );
  });

  it("receives correct geocoding results (first - first provider OK)", (done) => {
    const yandexGeocoder = UniversalGeocoder.createGeocoder({
      provider: "yandex",
      useSsl: true,
      apiKey: "api_key",
    });
    const openStreetMapGeocoder = UniversalGeocoder.createGeocoder({
      provider: "openstreetmap",
      useSsl: true,
      userAgent: "Universal Geocoder Example",
    });
    const provider = UniversalGeocoder.createGeocoder({
      provider: "chain",
      providers: [yandexGeocoder, openStreetMapGeocoder],
      first: true,
    });

    provider?.geocode(
      { text: "1600 Pennsylvania Ave, Washington, DC", locale: "en_US" },
      (results: Geocoded[]) => {
        const geocoded = results[0];

        expectGeocodedOpenStreetMap(geocoded);

        done();
      }
    );
  });

  it("receives correct geodecoding results (first provider OK)", (done) => {
    const yandexGeocoder = UniversalGeocoder.createGeocoder({
      provider: "yandex",
      useSsl: true,
      apiKey: "api_key",
    });
    const openStreetMapGeocoder = UniversalGeocoder.createGeocoder({
      provider: "openstreetmap",
      useSsl: true,
      userAgent: "Universal Geocoder Example",
    });
    const provider = UniversalGeocoder.createGeocoder({
      provider: "chain",
      providers: [yandexGeocoder, openStreetMapGeocoder],
    });

    provider?.geodecode(
      { latitude: 48.8631507, longitude: 2.388911, locale: "en_US" },
      (results: Geocoded[]) => {
        const geocoded = results[0];

        expectGeodecodedYandex(geocoded);

        done();
      }
    );
  });

  it("receives correct geodecoding results (first provider KO)", (done) => {
    const yandexGeocoder = UniversalGeocoder.createGeocoder({
      provider: "yandex",
      useSsl: true,
      apiKey: "api_key",
    });
    const openStreetMapGeocoder = UniversalGeocoder.createGeocoder({
      provider: "openstreetmap",
      useSsl: true,
      userAgent: "Universal Geocoder Example",
    });
    const provider = UniversalGeocoder.createGeocoder({
      provider: "chain",
      providers: [yandexGeocoder, openStreetMapGeocoder],
    });

    provider?.geodecode(
      { latitude: 48.8631507, longitude: 2.388911, locale: "en_US" },
      (results: Geocoded[]) => {
        const geocoded = results[0];

        expectGeodecodedOpenStreetMap(geocoded);

        done();
      }
    );
  });

  it("receives correct geodecoding results (parallelize - first provider OK)", (done) => {
    const yandexGeocoder = UniversalGeocoder.createGeocoder({
      provider: "yandex",
      useSsl: true,
      apiKey: "api_key",
    });
    const openStreetMapGeocoder = UniversalGeocoder.createGeocoder({
      provider: "openstreetmap",
      useSsl: true,
      userAgent: "Universal Geocoder Example",
    });
    const provider = UniversalGeocoder.createGeocoder({
      provider: "chain",
      providers: [yandexGeocoder, openStreetMapGeocoder],
      parallelize: true,
    });

    provider?.geodecode(
      { latitude: 48.8631507, longitude: 2.388911, locale: "en_US" },
      (results: Geocoded[]) => {
        const geocoded = results[0];

        expectGeodecodedYandex(geocoded);

        done();
      }
    );
  });

  it("receives correct geodecoding results (parallelize - first provider KO)", (done) => {
    const yandexGeocoder = UniversalGeocoder.createGeocoder({
      provider: "yandex",
      useSsl: true,
      apiKey: "api_key",
    });
    const openStreetMapGeocoder = UniversalGeocoder.createGeocoder({
      provider: "openstreetmap",
      useSsl: true,
      userAgent: "Universal Geocoder Example",
    });
    const provider = UniversalGeocoder.createGeocoder({
      provider: "chain",
      providers: [yandexGeocoder, openStreetMapGeocoder],
      parallelize: true,
    });

    provider?.geodecode(
      { latitude: 48.8631507, longitude: 2.388911, locale: "en_US" },
      (results: Geocoded[]) => {
        const geocoded = results[0];

        expectGeodecodedOpenStreetMap(geocoded);

        done();
      }
    );
  });

  it("receives correct geodecoding results (first - first provider OK)", (done) => {
    const yandexGeocoder = UniversalGeocoder.createGeocoder({
      provider: "yandex",
      useSsl: true,
      apiKey: "api_key",
    });
    const openStreetMapGeocoder = UniversalGeocoder.createGeocoder({
      provider: "openstreetmap",
      useSsl: true,
      userAgent: "Universal Geocoder Example",
    });
    const provider = UniversalGeocoder.createGeocoder({
      provider: "chain",
      providers: [yandexGeocoder, openStreetMapGeocoder],
      first: true,
    });

    provider?.geodecode(
      { latitude: 48.8631507, longitude: 2.388911, locale: "en_US" },
      (results: Geocoded[]) => {
        const geocoded = results[0];

        expectGeodecodedOpenStreetMap(geocoded);

        done();
      }
    );
  });
});
