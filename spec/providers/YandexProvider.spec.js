describe("Yandex Geocoder Provider raw result to Geocoded mapping tests", function() {
  var provider = new GeocoderJS.YandexProvider(new GeocoderJS.ExternalURILoader()),
    geocoded;

  var stubYandexResult = {
      "metaDataProperty": {
        "GeocoderMetaData": {
          "kind": "house",
          "text": "United States, District of Columbia, Washington, Pennsylvania Ave NW, 1600",
          "precision": "exact",
          "AddressDetails": {
            "Country": {
              "AddressLine": "District of Columbia, Washington, Pennsylvania Ave NW, 1600",
              "CountryNameCode": "US",
              "CountryName": "United States",
              "AdministrativeArea": {
                "AdministrativeAreaName": "District of Columbia",
                "SubAdministrativeArea": {
                  "SubAdministrativeAreaName": "District of Columbia",
                  "Locality": {
                    "LocalityName": "Washington",
                    "Thoroughfare": {
                      "ThoroughfareName": "Pennsylvania Ave NW",
                      "Premise": {
                        "PremiseNumber": "1600"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "description": "Washington, District of Columbia, United States",
      "name": "Pennsylvania Ave NW, 1600",
      "boundedBy": {
        "Envelope": {
          "lowerCorner": "-77.046921 38.891265",
          "upperCorner": "-77.030464 38.904125"
        }
      },
      "Point": {
        "pos": "-77.038692 38.897695"
      }
    };

  beforeEach(function () {
    geocoded = provider.mapToGeocoded(stubYandexResult);
  });

  it ("receives results from the yandex geocoder", function() {
    expect(geocoded).toBeDefined();
  });

  it ("maps coordinates correctly", function() {
    expect(geocoded.getCoordinates()).toEqual([38.897695, -77.038692]);
  });

  it ("maps street name correctly", function() {
    expect(geocoded.getStreetName()).toEqual("Pennsylvania Ave NW");
  });

  it ("maps city correctly", function() {
    expect(geocoded.getCity()).toEqual("Washington");
  });

  it ("maps region correctly", function() {
    expect(geocoded.getRegion()).toEqual("District of Columbia");
  });
});
