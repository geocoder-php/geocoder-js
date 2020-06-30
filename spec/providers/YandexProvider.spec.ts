import { YandexProvider, YandexResult } from "providers";
import Geocoded from "Geocoded";

describe("Yandex Geocoder Provider raw result to Geocoded mapping", () => {
  let geocoded: Geocoded;

  const stubYandexResult: YandexResult = {
    metaDataProperty: {
      GeocoderMetaData: {
        kind: "house",
        text:
          "United States, District of Columbia, Washington, Pennsylvania Ave NW, 1600",
        precision: "exact",
        AddressDetails: {
          Country: {
            AddressLine:
              "District of Columbia, Washington, Pennsylvania Ave NW, 1600",
            CountryNameCode: "US",
            CountryName: "United States",
            AdministrativeArea: {
              AdministrativeAreaName: "District of Columbia",
              SubAdministrativeArea: {
                SubAdministrativeAreaName: "District of Columbia",
                Locality: {
                  LocalityName: "Washington",
                  Thoroughfare: {
                    ThoroughfareName: "Pennsylvania Ave NW",
                    Premise: {
                      PremiseNumber: "1600",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    description: "Washington, District of Columbia, United States",
    name: "Pennsylvania Ave NW, 1600",
    boundedBy: {
      Envelope: {
        lowerCorner: "-77.046921 38.891265",
        upperCorner: "-77.030464 38.904125",
      },
    },
    Point: {
      pos: "-77.038692 38.897695",
    },
  };

  beforeEach(() => {
    geocoded = YandexProvider.mapToGeocoded(stubYandexResult);
  });

  it("receives results from the Yandex geocoder", () => {
    expect(geocoded).toBeDefined();
  });

  it("maps coordinates correctly", () => {
    expect(geocoded.getCoordinates()).toEqual([38.897695, -77.038692]);
  });

  it("maps street number correctly", () => {
    expect(geocoded.getStreetNumber()).toEqual("1600");
  });

  it("maps street name correctly", () => {
    expect(geocoded.getStreetName()).toEqual("Pennsylvania Ave NW");
  });

  it("maps sublocality correctly", () => {
    expect(geocoded.getSubLocality()).toEqual(undefined);
  });

  it("maps locality correctly", () => {
    expect(geocoded.getLocality()).toEqual("Washington");
  });

  it("maps region correctly", () => {
    expect(geocoded.getRegion()).toEqual("District of Columbia");
  });

  it("maps country correctly", () => {
    expect(geocoded.getCountry()).toEqual("United States");
  });

  it("maps country code correctly", () => {
    expect(geocoded.getCountryCode()).toEqual("US");
  });
});
