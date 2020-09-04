import GeocoderJS from "GeocoderJS";
import { MapQuestGeocoded, MapQuestProvider } from "provider";
import ExternalLoader from "ExternalLoader";
import AdminLevel from "AdminLevel";
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
    expect(() => new MapQuestProvider(new ExternalLoader())).toThrowError(
      Error,
      'An API key is required for the MapQuest provider. Please add it in the "apiKey" option.'
    );
  });

  it("expects to not support IP geolocation", () => {
    const provider = GeocoderJS.createGeocoder({
      provider: "mapquest",
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
      "The MapQuest provider does not support IP geolocation, only location geocoding."
    );
  });

  it("receives correct geocoding results", (done) => {
    const provider = GeocoderJS.createGeocoder({
      provider: "mapquest",
      useSsl: true,
      apiKey: "api_key",
    });

    provider?.geocode(
      "1600 Pennsylvania Ave, Washington, DC",
      (results: MapQuestGeocoded[]) => {
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
        expect(geocoded.getAdminLevels()).toEqual([
          AdminLevel.create({ level: 1, name: "DC", code: "DC" }),
          AdminLevel.create({ level: 2, name: "District Of Columbia" }),
        ]);
        expect(geocoded.getCountry()).toEqual("US");
        expect(geocoded.getCountryCode()).toEqual("US");
        expect(geocoded.getPrecision()).toEqual("POINT");
        expect(geocoded.getPrecisionCode()).toEqual("P1AAA");
        expect(geocoded.getMapUrl()).toEqual(
          "http://www.mapquestapi.com/staticmap/v5/map?type=map&size=225,160&locations=38.895206,-77.036515|marker-sm-50318A-1&scalebar=true&zoom=15&rand=1195279033"
        );
        expect(geocoded.getAttribution()).toEqual("© 2020 MapQuest, Inc.");

        done();
      }
    );
  });

  it("receives correct geocoding results using POST and open domain", (done) => {
    const provider = GeocoderJS.createGeocoder({
      provider: "mapquest",
      useSsl: true,
      apiKey: "api_key",
      method: "POST",
      openDomain: true,
    });

    provider?.geocode(
      "1600 Pennsylvania Ave, Washington, DC",
      (results: MapQuestGeocoded[]) => {
        const geocoded = results[0];

        expect(geocoded).toBeDefined();
        expect(geocoded.getCoordinates()).toEqual([38.895854, -77.030713]);
        expect(geocoded.getBounds()).toEqual([
          undefined,
          undefined,
          undefined,
          undefined,
        ]);
        expect(geocoded.getFormattedAddress()).toEqual(undefined);
        expect(geocoded.getStreetNumber()).toEqual(undefined);
        expect(geocoded.getStreetName()).toEqual("");
        expect(geocoded.getSubLocality()).toEqual("Penn Quarter");
        expect(geocoded.getLocality()).toEqual("Washington");
        expect(geocoded.getPostalCode()).toEqual("20006");
        expect(geocoded.getRegion()).toEqual("");
        expect(geocoded.getAdminLevels()).toEqual([
          AdminLevel.create({ level: 1, name: "District of Columbia" }),
        ]);
        expect(geocoded.getCountry()).toEqual("US");
        expect(geocoded.getCountryCode()).toEqual("US");
        expect(geocoded.getPrecision()).toEqual("STREET");
        expect(geocoded.getPrecisionCode()).toEqual("B1XAX");
        expect(geocoded.getMapUrl()).toEqual(
          "http://open.mapquestapi.com/staticmap/v5/map?type=map&size=225,160&locations=38.8958536,-77.0307129|marker-sm-50318A-1&scalebar=true&zoom=15&rand=942576975"
        );
        expect(geocoded.getAttribution()).toEqual("© 2020 MapQuest, Inc.");

        done();
      }
    );
  });

  it("receives correct geodecoding results", (done) => {
    const provider = GeocoderJS.createGeocoder({
      provider: "mapquest",
      useSsl: true,
      apiKey: "api_key",
    });

    provider?.geodecode(48.8631507, 2.388911, (results: MapQuestGeocoded[]) => {
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
      expect(geocoded.getAdminLevels()).toEqual([
        AdminLevel.create({ level: 1, name: "Ile-de-France" }),
      ]);
      expect(geocoded.getCountry()).toEqual("FR");
      expect(geocoded.getCountryCode()).toEqual("FR");
      expect(geocoded.getPrecision()).toEqual("POINT");
      expect(geocoded.getPrecisionCode()).toEqual("P1AAA");
      expect(geocoded.getMapUrl()).toEqual(
        "http://www.mapquestapi.com/staticmap/v5/map?type=map&size=225,160&locations=48.8631163,2.38878|marker-sm-50318A-1&scalebar=true&zoom=15&rand=1980906355"
      );
      expect(geocoded.getAttribution()).toEqual("© 2020 MapQuest, Inc.");

      done();
    });
  });

  it("receives correct geodecoding results using POST and open domain", (done) => {
    const provider = GeocoderJS.createGeocoder({
      provider: "mapquest",
      useSsl: true,
      apiKey: "api_key",
      method: "POST",
      openDomain: true,
    });

    provider?.geodecode(48.8631507, 2.388911, (results: MapQuestGeocoded[]) => {
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
      expect(geocoded.getAdminLevels()).toEqual([
        AdminLevel.create({ level: 1, name: "Ile-de-France" }),
      ]);
      expect(geocoded.getCountry()).toEqual("FR");
      expect(geocoded.getCountryCode()).toEqual("FR");
      expect(geocoded.getPrecision()).toEqual("POINT");
      expect(geocoded.getPrecisionCode()).toEqual("P1AAA");
      expect(geocoded.getMapUrl()).toEqual(
        "http://open.mapquestapi.com/staticmap/v5/map?type=map&size=225,160&locations=48.8631163,2.38878|marker-sm-50318A-1&scalebar=true&zoom=15&rand=-1000393223"
      );
      expect(geocoded.getAttribution()).toEqual("© 2020 MapQuest, Inc.");

      done();
    });
  });

  it("receives error when parameters are missing", (done) => {
    const provider = GeocoderJS.createGeocoder({
      provider: "mapquest",
      useSsl: true,
      apiKey: "api_key",
    });

    provider?.geocode(
      { location: {} },
      () => {
        done();
      },
      (error) => {
        expect(error.message).toEqual(
          "An error has occurred (400): Illegal argument from request: Insufficient info for location"
        );
        done();
      }
    );
  });

  it("receives error when the API key is bad", (done) => {
    const provider = GeocoderJS.createGeocoder({
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
