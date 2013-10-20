describe("Google API Geocoder Provider raw result to Geocoded mapping tests", function() {
  var provider = new GeocoderJS.GoogleAPIProvider(),
    geocoded;

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
    },
    {
      long_name: "Washington, D.C.",
      short_name: "Washington, D.C.",
      types: ["locality", "political"]
    },
    {
      long_name: "District of Columbia",
      short_name: "DC",
      types: ["administrative_area_level_1", "political"]
    },
    {
      long_name: "20050",
      short_name: "20050",
      types: ["postal_code"]
    }],
    geometry: {
      location: {
        lat: 38.8978378,
        lng: -77.0365123
      }
    }
  }];

  beforeEach(function () {
    spyOn(provider, 'executeRequest').andReturn(stubGoogleResult);
    geocoded = provider.mapToGeocoded(stubGoogleResult[0]);
  });

  it ("receives results from the google geocoder", function() {
    expect(geocoded).toBeDefined();
  });

  it ("maps coordinates correctly", function() {
    expect(geocoded.getCoordinates()).toEqual([38.8978378, -77.0365123]);
  });

  it ("maps street number correctly", function() {
    expect(geocoded.getStreetNumber()).toEqual("1600");
  });

  it ("maps street name correctly", function() {
    expect(geocoded.getStreetName()).toEqual("Pennsylvania Avenue Northwest");
  });

  it ("maps city correctly", function() {
    expect(geocoded.getCity()).toEqual("Washington, D.C.");
  });

  it ("maps region correctly", function() {
    expect(geocoded.getRegion()).toEqual("District of Columbia");
  });

  it ("maps postal code correctly", function() {
    expect(geocoded.getZipcode()).toEqual("20050");
  });
});
