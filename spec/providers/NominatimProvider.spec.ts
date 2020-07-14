import {
  NominatimGeocoded,
  OpenStreetMapProvider,
  OpenStreetMapResult,
} from "providers";
import ExternalURILoader from "ExternalURILoader";
import AdminLevel from "AdminLevel";

describe("OpenStreetMap / Nominatim Geocoder Provider raw result to Geocoded mapping", () => {
  let geocoded: NominatimGeocoded;

  const stubOpenStreetMapResult: OpenStreetMapResult[] = [
    {
      place_id: 9141060761,
      licence:
        "Data © OpenStreetMap contributors, ODbL 1.0. http://www.openstreetmap.org/copyright",
      osm_type: "way",
      osm_id: 238241022,
      boundingbox: [
        "38.8974876403809",
        "38.8979148864746",
        "-77.0368804931641",
        "-77.036247253418",
      ],
      lat: "38.89770045",
      lon: "-77.0365643605898",
      display_name:
        "The White House, 1600, Pennsylvania Avenue Northwest, Foggy Bottom, Farragut Square, Washington, District of Columbia, 20500, United States of America",
      category: "tourism",
      type: "attraction",
      importance: 1.5076757387296,
      icon:
        "http://nominatim.openstreetmap.org/images/mapicons/poi_point_of_interest.p.20.png",
      address: {
        attraction: "The White House",
        house_number: "1600",
        road: "Pennsylvania Avenue Northwest",
        neighbourhood: "Foggy Bottom",
        suburb: "Farragut Square",
        city: "Washington",
        state: "District of Columbia",
        postcode: "20500",
        country: "United States of America",
        country_code: "us",
      },
    },
  ];

  beforeEach(() => {
    geocoded = OpenStreetMapProvider.mapToGeocoded(stubOpenStreetMapResult[0]);
  });

  it("receives results from the OpenStreetMap / Nominatim geocoder", () => {
    expect(geocoded).toBeDefined();
  });

  it("expects User-Agent to be required on initiation", () => {
    expect(
      () => new OpenStreetMapProvider(new ExternalURILoader())
    ).toThrowError(
      Error,
      'An User-Agent identifying your application is required for the OpenStreetMap / Nominatim provider when using the default host. Please add it in the "userAgent" option.'
    );
  });

  it("maps coordinates correctly", () => {
    expect(geocoded.getCoordinates()).toEqual([38.89770045, -77.0365643605898]);
  });

  it("maps bounds correctly", () => {
    expect(geocoded.getBounds()).toEqual([
      38.8974876403809,
      -77.0368804931641,
      38.8979148864746,
      -77.036247253418,
    ]);
  });

  it("maps display name correctly", () => {
    expect(geocoded.getDisplayName()).toEqual(
      "The White House, 1600, Pennsylvania Avenue Northwest, Foggy Bottom, Farragut Square, Washington, District of Columbia, 20500, United States of America"
    );
  });

  it("maps street number correctly", () => {
    expect(geocoded.getStreetNumber()).toEqual("1600");
  });

  it("maps street name correctly", () => {
    expect(geocoded.getStreetName()).toEqual("Pennsylvania Avenue Northwest");
  });

  it("maps sublocality correctly", () => {
    expect(geocoded.getSubLocality()).toEqual("Farragut Square");
  });

  it("maps locality correctly", () => {
    expect(geocoded.getLocality()).toEqual("Washington");
  });

  it("maps postal code correctly", () => {
    expect(geocoded.getPostalCode()).toEqual("20500");
  });

  it("maps region correctly", () => {
    expect(geocoded.getRegion()).toEqual("District of Columbia");
  });

  it("maps admin levels correctly", () => {
    expect(geocoded.getAdminLevels()).toEqual([
      AdminLevel.create({ level: 1, name: "District of Columbia" }),
    ]);
  });

  it("maps country correctly", () => {
    expect(geocoded.getCountry()).toEqual("United States of America");
  });

  it("maps country code correctly", () => {
    expect(geocoded.getCountryCode()).toEqual("us");
  });

  it("maps OSM id correctly", () => {
    expect(geocoded.getOsmId()).toEqual(238241022);
  });

  it("maps OSM type correctly", () => {
    expect(geocoded.getOsmType()).toEqual("way");
  });

  it("maps category correctly", () => {
    expect(geocoded.getCategory()).toEqual("tourism");
  });

  it("maps type correctly", () => {
    expect(geocoded.getType()).toEqual("attraction");
  });

  it("maps attribution correctly", () => {
    expect(geocoded.getAttribution()).toEqual(
      "Data © OpenStreetMap contributors, ODbL 1.0. http://www.openstreetmap.org/copyright"
    );
  });
});
