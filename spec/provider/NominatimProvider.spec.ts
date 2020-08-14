import UniversalGeocoder from "UniversalGeocoder";
import { NominatimGeocoded, OpenStreetMapProvider } from "provider";
import ExternalLoader from "ExternalLoader";
import AdminLevel from "AdminLevel";
import setupPolly, { cleanRecording } from "../setupPolly";

describe("OpenStreetMap / Nominatim Geocoder Provider", () => {
  const pollyContext = setupPolly();

  beforeEach(() => {
    cleanRecording(pollyContext);
  });

  afterEach(async () => {
    await pollyContext.polly.flush();
  });

  it("expects User-Agent to be required on initiation", () => {
    expect(() => new OpenStreetMapProvider(new ExternalLoader())).toThrowError(
      Error,
      'An User-Agent identifying your application is required for the OpenStreetMap / Nominatim provider when using the default host. Please add it in the "userAgent" option.'
    );
  });

  it("receives correct geocoding results", (done) => {
    const provider = UniversalGeocoder.createGeocoder({
      provider: "nominatim",
      useSsl: true,
      userAgent: "Universal Geocoder Example",
    });

    provider?.geocode(
      "1600 Pennsylvania Ave, Washington, DC",
      (results: NominatimGeocoded[]) => {
        const geocoded = results[0];

        expect(geocoded).toBeDefined();
        expect(geocoded.getCoordinates()).toEqual([38.8958536, -77.0307129]);
        expect(geocoded.getBounds()).toEqual([
          38.8957842,
          -77.0309688,
          38.895924,
          -77.0304609,
        ]);
        expect(geocoded.getFormattedAddress()).toEqual(undefined);
        expect(geocoded.getDisplayName()).toEqual(
          "Pennsylvania Avenue, Penn Quarter, Washington, District of Columbia, 20045, United States of America"
        );
        expect(geocoded.getStreetNumber()).toEqual(undefined);
        expect(geocoded.getStreetName()).toEqual("Pennsylvania Avenue");
        expect(geocoded.getSubLocality()).toEqual(undefined);
        expect(geocoded.getLocality()).toEqual("Washington");
        expect(geocoded.getPostalCode()).toEqual("20045");
        expect(geocoded.getRegion()).toEqual("District of Columbia");
        expect(geocoded.getAdminLevels()).toEqual([
          AdminLevel.create({ level: 1, name: "District of Columbia" }),
          AdminLevel.create({ level: 2, name: "Washington" }),
        ]);
        expect(geocoded.getCountry()).toEqual("United States of America");
        expect(geocoded.getCountryCode()).toEqual("us");
        expect(geocoded.getOsmId()).toEqual(564931814);
        expect(geocoded.getOsmType()).toEqual("way");
        expect(geocoded.getCategory()).toEqual("highway");
        expect(geocoded.getType()).toEqual("path");
        expect(geocoded.getAttribution()).toEqual(
          "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright"
        );

        done();
      }
    );
  });

  it("receives correct geodecoding results", (done) => {
    const provider = UniversalGeocoder.createGeocoder({
      provider: "nominatim",
      useSsl: true,
      userAgent: "Universal Geocoder Example",
    });

    provider?.geodecode(
      48.8631507,
      2.388911,
      (results: NominatimGeocoded[]) => {
        const geocoded = results[0];

        expect(geocoded).toBeDefined();
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
        expect(geocoded.getDisplayName()).toEqual(
          "Quartier du Père-Lachaise, Paris, Île-de-France, France métropolitaine, 75020, France"
        );
        expect(geocoded.getStreetNumber()).toEqual(undefined);
        expect(geocoded.getStreetName()).toEqual(undefined);
        expect(geocoded.getSubLocality()).toEqual("Quartier du Père-Lachaise");
        expect(geocoded.getLocality()).toEqual("Paris");
        expect(geocoded.getPostalCode()).toEqual("75020");
        expect(geocoded.getRegion()).toEqual("Île-de-France");
        expect(geocoded.getAdminLevels()).toEqual([
          AdminLevel.create({ level: 1, name: "Île-de-France" }),
          AdminLevel.create({ level: 2, name: "Paris" }),
        ]);
        expect(geocoded.getCountry()).toEqual("France");
        expect(geocoded.getCountryCode()).toEqual("fr");
        expect(geocoded.getOsmId()).toEqual(322777831);
        expect(geocoded.getOsmType()).toEqual("way");
        expect(geocoded.getCategory()).toEqual("highway");
        expect(geocoded.getType()).toEqual("pedestrian");
        expect(geocoded.getAttribution()).toEqual(
          "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright"
        );

        done();
      }
    );
  });
});
