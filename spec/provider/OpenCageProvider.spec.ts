import { OpenCageGeocoded, OpenCageProvider, OpenCageResult } from "provider";
import ExternalLoader from "ExternalLoader";
import AdminLevel from "AdminLevel";

describe("OpenCage Geocoder Provider raw result to Geocoded mapping", () => {
  let geocoded: OpenCageGeocoded;

  const stubOpenCageResult: OpenCageResult[] = [
    {
      annotations: {
        DMS: {
          lat: "38° 53' 51.71928'' N",
          lng: "77° 2' 11.59260'' W",
        },
        FIPS: {
          county: "11001",
          state: "11",
        },
        MGRS: "18SUJ2338907395",
        Maidenhead: "FM18lv55ok",
        Mercator: {
          x: -8575669.907,
          y: 4680193.667,
        },
        OSM: {
          edit_url:
            "https://www.openstreetmap.org/edit?way=238241022#map=16/38.89770/-77.03655",
          note_url:
            "https://www.openstreetmap.org/note/new#map=16/38.89770/-77.03655&layers=N",
          url:
            "https://www.openstreetmap.org/?mlat=38.89770&mlon=-77.03655#map=16/38.89770/-77.03655",
        },
        UN_M49: {
          regions: {
            AMERICAS: "019",
            NORTHERN_AMERICA: "021",
            US: "840",
            WORLD: "001",
          },
          statistical_groupings: ["MEDC"],
        },
        callingcode: 1,
        currency: {
          alternate_symbols: ["US$"],
          decimal_mark: ".",
          disambiguate_symbol: "US$",
          html_entity: "$",
          iso_code: "USD",
          iso_numeric: "840",
          name: "United States Dollar",
          smallest_denomination: 1,
          subunit: "Cent",
          subunit_to_unit: 100,
          symbol: "$",
          symbol_first: 1,
          thousands_separator: ",",
        },
        flag: "🇺🇸",
        geohash: "dqcjqcpew0y36kbv76ew",
        qibla: 56.56,
        roadinfo: {
          drive_on: "right",
          speed_in: "mph",
        },
        sun: {
          rise: {
            apparent: 1595844420,
            astronomical: 1595837940,
            civil: 1595842620,
            nautical: 1595840400,
          },
          set: {
            apparent: 1595809320,
            astronomical: 1595815740,
            civil: 1595811120,
            nautical: 1595813340,
          },
        },
        timezone: {
          name: "America/New_York",
          now_in_dst: 1,
          offset_sec: -14400,
          offset_string: "-0400",
          short_name: "EDT",
        },
        what3words: {
          words: "deeply.bunk.farmer",
        },
        wikidata: "Q35525",
      },
      bounds: {
        northeast: {
          lat: 38.897911,
          lng: -77.0362526,
        },
        southwest: {
          lat: 38.8974898,
          lng: -77.0368542,
        },
      },
      components: {
        "ISO_3166-1_alpha-2": "US",
        "ISO_3166-1_alpha-3": "USA",
        _category: "travel/tourism",
        _type: "castle",
        castle: "White House",
        city: "Washington D.C.",
        continent: "North America",
        country: "United States of America",
        country_code: "us",
        county: "Washington",
        house_number: "1600",
        neighbourhood: "Golden Triangle",
        pedestrian: "Pennsylvania Avenue Northwest",
        postcode: "20500",
        state: "District of Columbia",
        state_code: "DC",
      },
      confidence: 9,
      formatted:
        "White House, 1600 Pennsylvania Avenue Northwest, Washington, DC 20500, United States of America",
      geometry: {
        lat: 38.8976998,
        lng: -77.0365535,
      },
    },
  ];

  beforeEach(() => {
    geocoded = OpenCageProvider.mapToGeocoded(stubOpenCageResult[0]);
  });

  it("receives results from the OpenCage geocoder", () => {
    expect(geocoded).toBeDefined();
  });

  it("expects API Key to be required on initiation", () => {
    expect(() => new OpenCageProvider(new ExternalLoader())).toThrowError(
      Error,
      'An API key is required for the OpenCage provider. Please add it in the "apiKey" option.'
    );
  });

  it("maps coordinates correctly", () => {
    expect(geocoded.getCoordinates()).toEqual([38.8976998, -77.0365535]);
  });

  it("maps bounds correctly", () => {
    expect(geocoded.getBounds()).toEqual([
      38.8974898,
      -77.0368542,
      38.897911,
      -77.0362526,
    ]);
  });

  it("maps formatted address correctly", () => {
    expect(geocoded.getFormattedAddress()).toEqual(
      "White House, 1600 Pennsylvania Avenue Northwest, Washington, DC 20500, United States of America"
    );
  });

  it("maps street number correctly", () => {
    expect(geocoded.getStreetNumber()).toEqual("1600");
  });

  it("maps street name correctly", () => {
    expect(geocoded.getStreetName()).toEqual("Pennsylvania Avenue Northwest");
  });

  it("maps sublocality correctly", () => {
    expect(geocoded.getSubLocality()).toEqual("Golden Triangle");
  });

  it("maps locality correctly", () => {
    expect(geocoded.getLocality()).toEqual("Washington D.C.");
  });

  it("maps postal code correctly", () => {
    expect(geocoded.getPostalCode()).toEqual("20500");
  });

  it("maps region correctly", () => {
    expect(geocoded.getRegion()).toEqual("District of Columbia");
  });

  it("maps admin levels correctly", () => {
    expect(geocoded.getAdminLevels()).toEqual([
      AdminLevel.create({ level: 1, name: "District of Columbia", code: "DC" }),
      AdminLevel.create({ level: 2, name: "Washington" }),
    ]);
  });

  it("maps country correctly", () => {
    expect(geocoded.getCountry()).toEqual("United States of America");
  });

  it("maps country code correctly", () => {
    expect(geocoded.getCountryCode()).toEqual("us");
  });

  it("maps timezone correctly", () => {
    expect(geocoded.getTimezone()).toEqual("America/New_York");
  });

  it("maps calling code correctly", () => {
    expect(geocoded.getCallingCode()).toEqual(1);
  });

  it("maps flag correctly", () => {
    expect(geocoded.getFlag()).toEqual("🇺🇸");
  });

  it("maps MGRS correctly", () => {
    expect(geocoded.getMgrs()).toEqual("18SUJ2338907395");
  });

  it("maps Maidenhead correctly", () => {
    expect(geocoded.getMaidenhead()).toEqual("FM18lv55ok");
  });

  it("maps Geohash correctly", () => {
    expect(geocoded.getGeohash()).toEqual("dqcjqcpew0y36kbv76ew");
  });

  it("maps What3words correctly", () => {
    expect(geocoded.getWhat3words()).toEqual("deeply.bunk.farmer");
  });
});
