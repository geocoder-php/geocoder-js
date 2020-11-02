import GeocoderJS from "GeocoderJS";
import { GeoPluginGeocoded } from "provider";
import AdminLevel from "AdminLevel";
import setupPolly, { cleanRecording } from "../setupPolly";

describe("GeoPlugin Geocoder Provider", () => {
  const pollyContext = setupPolly();

  beforeEach(() => {
    cleanRecording(pollyContext);
  });

  afterEach(async () => {
    await pollyContext.polly.flush();
  });

  it("expects to not support location geocoding", () => {
    const provider = GeocoderJS.createGeocoder({
      provider: "geoplugin",
    });

    expect(() =>
      provider?.geocode(
        "1600 Pennsylvania Ave, Washington, DC",
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => {}
      )
    ).toThrowError(
      Error,
      "The GeoPlugin provider does not support location geocoding, only IP geolocation."
    );
  });

  it("expects to not support reverse geocoding", () => {
    const provider = GeocoderJS.createGeocoder({
      provider: "geoplugin",
    });

    expect(() =>
      provider?.geodecode(
        48.8631507,
        2.388911,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => {}
      )
    ).toThrowError(
      Error,
      "The GeoPlugin provider does not support reverse geocoding."
    );
  });

  it("receives correct IP geolocation results", (done) => {
    const provider = GeocoderJS.createGeocoder({
      provider: "geoplugin",
    });

    provider?.geocode("190.226.155.134", (results: GeoPluginGeocoded[]) => {
      const geocoded = results[0];

      expect(geocoded).toBeDefined();
      expect(geocoded.getCoordinates()).toEqual({
        latitude: -32.2167,
        longitude: -58.1333,
      });
      expect(geocoded.getBounds()).toEqual(undefined);
      expect(geocoded.getFormattedAddress()).toEqual(undefined);
      expect(geocoded.getStreetNumber()).toEqual(undefined);
      expect(geocoded.getStreetName()).toEqual(undefined);
      expect(geocoded.getSubLocality()).toEqual(undefined);
      expect(geocoded.getLocality()).toEqual("Colon");
      expect(geocoded.getPostalCode()).toEqual(undefined);
      expect(geocoded.getRegion()).toEqual("Entre Rios");
      expect(geocoded.getAdminLevels()).toEqual([
        AdminLevel.create({ level: 1, name: "Entre Rios", code: "E" }),
      ]);
      expect(geocoded.getCountry()).toEqual("Argentina");
      expect(geocoded.getCountryCode()).toEqual("AR");

      done();
    });
  });

  it("receives correct IP geolocation localhost results", (done) => {
    const provider = GeocoderJS.createGeocoder({
      provider: "geoplugin",
    });

    provider?.geocode("127.0.0.1", (results: GeoPluginGeocoded[]) => {
      const geocoded = results[0];

      expect(geocoded).toBeDefined();
      expect(geocoded.getCoordinates()).toEqual(undefined);
      expect(geocoded.getBounds()).toEqual(undefined);
      expect(geocoded.getFormattedAddress()).toEqual(undefined);
      expect(geocoded.getStreetNumber()).toEqual(undefined);
      expect(geocoded.getStreetName()).toEqual(undefined);
      expect(geocoded.getSubLocality()).toEqual(undefined);
      expect(geocoded.getLocality()).toEqual("localhost");
      expect(geocoded.getPostalCode()).toEqual(undefined);
      expect(geocoded.getRegion()).toEqual(undefined);
      expect(geocoded.getAdminLevels()).toEqual([]);
      expect(geocoded.getCountry()).toEqual("localhost");
      expect(geocoded.getCountryCode()).toEqual(undefined);

      done();
    });
  });

  it("receives error when IP is not found", (done) => {
    const provider = GeocoderJS.createGeocoder({
      provider: "geoplugin",
    });

    provider?.geocode(
      "192.168.1.10",
      () => {
        done();
      },
      (error) => {
        expect(error.message).toEqual("An error has occurred. Status: 404.");
        done();
      }
    );
  });
});
