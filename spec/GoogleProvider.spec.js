describe("Google Geocoder Provider raw result to Geocoded mapping tests", function() {
  var provider = new GoogleProvider();
  var geocoded;

  var stubGoogleResult = [{
    address_components: [{
      long_name: "1600",
      short_name: "1600",
      types: ["street_number"]
    },
    {
      long_name: "Pennsylvania Avenue Northwest",
      short_name: "Pennsylvania Avenue NW",
      types: ["route"]
    }],
    geometry: {
      location: {
        lat: function() {
          return 38.8978378;
        },
        lng: function() {
          return -77.0365123;
        }
      }
    }
  }];

  beforeEach(function() {
    geocoded = provider.mapToGeocoded(stubGoogleResult[0]);
  });

  it ("maps coordinates correctly", function() {
    var expectedCoordinates = [38.8978378, -77.0365123];
    expect(geocoded.getCoordinates()).toEqual(expectedCoordinates);
  });

  it ("maps street number correctly", function() {
    expect(geocoded.getStreetNumber()).toEqual("1600");
  });

  it ("maps street name correctly", function() {
    expect(geocoded.getStreetName()).toEqual("Pennsylvania Avenue Northwest");
  });
});
