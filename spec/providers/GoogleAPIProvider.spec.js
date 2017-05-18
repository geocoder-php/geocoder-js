describe("Google API Geocoder Provider raw result to Geocoded mapping tests", function() {
  var provider = new GeocoderJS.GoogleAPIProvider(new GeocoderJS.ExternalURILoader()),
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
      },
      bounds: {
        northeast: {
          lat: 38.8989583802915,
          lng: -77.03538596970849
        },
        southwest: {
          lat: 38.8962604197085,
          lng: -77.0380839302915
        }
      },
      location_type: "ROOFTOP",
      viewport: {
        northeast: {
          lat: 38.8989583802915,
          lng: -77.03538596970849
        },
        southwest: {
          lat: 38.8962604197085,
          lng: -77.0380839302915
        }
      }
    }
  }];

  beforeEach(function () {
    geocoded = provider.mapToGeocoded(stubGoogleResult[0]);
  });

  it ("receives results from the google geocoder", function() {
    expect(geocoded).toBeDefined();
  });

  it ("maps coordinates correctly", function() {
    expect(geocoded.getCoordinates()).toEqual([38.8978378, -77.0365123]);
  });

  it ("maps bounds correctly", function() {
      expect(geocoded.getBounds()).toEqual([[ 38.8962604197085, -77.0380839302915], [38.8989583802915, -77.03538596970849]]);
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
