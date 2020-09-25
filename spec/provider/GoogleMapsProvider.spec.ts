import UniversalGeocoder from "UniversalGeocoder";
import { GoogleMapsGeocoded, GoogleMapsProvider } from "provider";
import ExternalLoader from "ExternalLoader";
import AdminLevel from "AdminLevel";
import setupPolly, { cleanRecording } from "../setupPolly";

describe("Google Maps Geocoder Provider", () => {
  const pollyContext = setupPolly();

  beforeEach(() => {
    cleanRecording(pollyContext);
  });

  afterEach(async () => {
    await pollyContext.polly.flush();
  });

  it("expects API Key or client ID to be required on initiation", () => {
    expect(() => new GoogleMapsProvider(new ExternalLoader())).toThrowError(
      Error,
      'An API key or a client ID is required for the Google Maps provider. Please add it in the "apiKey" or the "clientId" option.'
    );
  });

  it("expects secret to be required on initiation when client ID is set", () => {
    expect(
      () =>
        new GoogleMapsProvider(new ExternalLoader(), {
          clientId: "client_id",
        })
    ).toThrowError(
      Error,
      'An URL signing secret is required if you use a client ID (Premium only). Please add it in the "secret" option.'
    );
  });

  it("expects country codes option to have only one value when set", () => {
    expect(
      () =>
        new GoogleMapsProvider(new ExternalLoader(), {
          apiKey: "api_key",
          countryCodes: ["fr", "uk"],
        })
    ).toThrowError(
      Error,
      'The "countryCodes" option must have only one country code top-level domain.'
    );
  });

  it("expects to not support IP geolocation", () => {
    const provider = UniversalGeocoder.createGeocoder({
      provider: "googlemaps",
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
      "The GoogleMaps provider does not support IP geolocation, only location geocoding."
    );
  });

  it("receives correct geocoding results", (done) => {
    const provider = UniversalGeocoder.createGeocoder({
      provider: "googlemaps",
      useSsl: true,
      apiKey: "api_key",
    });

    provider?.geocode("1600 Pennsylvania Ave, Washington, DC", (results) => {
      const geocoded = results[0];

      expect(geocoded).toBeDefined();
      expect(geocoded.getCoordinates()).toEqual([38.8976633, -77.0365739]);
      expect(geocoded.getBounds()).toEqual({
        latitude1: 38.8973063,
        longitude1: -77.03795749999999,
        latitude2: 38.8979044,
        longitude2: -77.0355124,
      });
      expect(geocoded.getFormattedAddress()).toEqual(
        "1600 Pennsylvania Avenue NW, Washington, DC 20500, USA"
      );
      expect(geocoded.getStreetNumber()).toEqual("1600");
      expect(geocoded.getStreetName()).toEqual("Pennsylvania Avenue Northwest");
      expect(geocoded.getSubLocality()).toEqual(undefined);
      expect(geocoded.getLocality()).toEqual("Washington");
      expect(geocoded.getPostalCode()).toEqual("20500");
      expect(geocoded.getRegion()).toEqual("District of Columbia");
      expect(geocoded.getAdminLevels()).toEqual([
        AdminLevel.create({
          level: 1,
          name: "District of Columbia",
          code: "DC",
        }),
      ]);
      expect(geocoded.getCountry()).toEqual("United States");
      expect(geocoded.getCountryCode()).toEqual("US");
      expect(geocoded.getPlaceId()).toEqual("ChIJGVtI4by3t4kRr51d_Qm_x58");
      expect(geocoded.getResultType()).toEqual([
        "establishment",
        "point_of_interest",
        "premise",
      ]);
      expect(geocoded.getLocationType()).toEqual("ROOFTOP");
      expect(geocoded.getPolitical()).toEqual("United States");
      expect(geocoded.getNeighborhood()).toEqual("Northwest Washington");

      done();
    });
  });

  it("receives correct geodecoding results", (done) => {
    const provider = UniversalGeocoder.createGeocoder({
      provider: "googlemaps",
      useSsl: true,
      apiKey: "api_key",
    });

    provider?.geodecode(
      48.8631507,
      2.388911,
      (results: GoogleMapsGeocoded[]) => {
        const geocoded = results[0];

        expect(geocoded).toBeDefined();
        expect(geocoded.getCoordinates()).toEqual([48.8631361, 2.3889219]);
        expect(geocoded.getBounds()).toEqual({
          latitude1: 48.8617871197085,
          longitude1: 2.387572919708498,
          latitude2: 48.8644850802915,
          longitude2: 2.390270880291502,
        });
        expect(geocoded.getFormattedAddress()).toEqual(
          "12 Avenue Gambetta, 75020 Paris, France"
        );
        expect(geocoded.getStreetNumber()).toEqual("12");
        expect(geocoded.getStreetName()).toEqual("Avenue Gambetta");
        expect(geocoded.getSubLocality()).toEqual(undefined);
        expect(geocoded.getLocality()).toEqual("Paris");
        expect(geocoded.getPostalCode()).toEqual("75020");
        expect(geocoded.getRegion()).toEqual("Île-de-France");
        expect(geocoded.getAdminLevels()).toEqual([
          AdminLevel.create({
            level: 2,
            name: "Arrondissement de Paris",
            code: "Arrondissement de Paris",
          }),
          AdminLevel.create({
            level: 1,
            name: "Île-de-France",
            code: "IDF",
          }),
        ]);
        expect(geocoded.getCountry()).toEqual("France");
        expect(geocoded.getCountryCode()).toEqual("FR");
        expect(geocoded.getPlaceId()).toEqual("ChIJ9aLL3vJt5kcR61GCze3v6fg");
        expect(geocoded.getResultType()).toEqual(["street_address"]);
        expect(geocoded.getLocationType()).toEqual("ROOFTOP");
        expect(geocoded.getPolitical()).toEqual("France");

        done();
      }
    );
  });

  it("receives error when the API key is bad", (done) => {
    const provider = UniversalGeocoder.createGeocoder({
      provider: "googlemaps",
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
          "Request has been denied: The provided API key is invalid."
        );
        done();
      }
    );
  });
});
