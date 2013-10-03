describe("Mapquest Provider to Geocoded mapping tests", function() {
  var provider = new GeocoderJS.MapquestProvider();
  var geocoded;

  var stubMapquestResult = {
    "locations": [
      {
        "latLng": {
          "lng": -77.036372,
          "lat": 38.895115
        },
        "adminArea4": "District of Columbia",
        "adminArea5Type": "City",
        "adminArea4Type": "County",
        "adminArea5": "Washington",
        "street": "",
        "adminArea1": "US",
        "adminArea3": "",
        "type": "s",
        "displayLatLng": {
          "lng": -77.036372,
          "lat": 38.895115
        },
        "linkId": 0,
        "postalCode": "",
        "sideOfStreet": "N",
        "dragPoint": false,
        "adminArea1Type": "Country",
        "geocodeQuality": "CITY",
        "geocodeQualityCode": "A5XCX",
        "adminArea3Type": "State"
      }
    ],
    "providedLocation": {
      "location": "Washington DC"
    }
  };

  beforeEach(function() {
    console.log(stubMapquestResult);
    geocoded = provider.mapToGeocoded(stubMapquestResult.locations[0]);
  });

  it ("maps coordinates correctly", function() {
    var expectedCoordinates = [38.895115, -77.036372];
    expect(geocoded.getCoordinates()).toEqual(expectedCoordinates);
  });
});
