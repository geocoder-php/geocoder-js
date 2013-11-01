describe("Mapquest Provider to Geocoded mapping tests", function() {
  var provider = new GeocoderJS.MapquestProvider();
  var geocoded;

  var stubMapquestResult =  [
      {
        "adminArea1": "US",
        "adminArea1Type": "Country",
        "adminArea3": "",
        "adminArea3Type": "State",
        "latLng": {
          "lng": -77.036372,
          "lat": 38.895115
        },
        "adminArea4": "District of Columbia",
        "adminArea5Type": "City",
        "adminArea4Type": "County",
        "adminArea5": "Washington",
        "street": "",
        "type": "s",
        "displayLatLng": {
          "lng": -77.036372,
          "lat": 38.895115
        },
        "linkId": 0,
        "postalCode": "",
        "sideOfStreet": "N",
        "dragPoint": false,
        "geocodeQuality": "CITY",
        "geocodeQualityCode": "A5XCX"
      }
    ];

  beforeEach(function () {
    spyOn(provider, 'executeRequest').andReturn(stubMapquestResult);
    geocoded = provider.mapToGeocoded(stubMapquestResult);
  });

  it ("expects API Key to be set on initiation.", function() {
    var testProvider = new GeocoderJS.MapquestProvider({apiKey: '[stub-api-key]'});
    expect(testProvider.apiKey).toEqual('[stub-api-key]');
  });

  it ("maps coordinates correctly", function() {
    var expectedCoordinates = [38.895115, -77.036372];
    expect(geocoded.getCoordinates()).toEqual(expectedCoordinates);
  });

  it ("maps city correctly", function() {
    expect(geocoded.getCity()).toEqual("Washington");
  });

  it ("maps region correctly", function() {
    expect(geocoded.getRegion()).toEqual("District of Columbia");
  });
});
