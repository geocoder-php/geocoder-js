
describe("Google API Geocoder Provider raw result to Geocoded mapping tests", function() {
  var provider = new GeocoderJS.GoogleAPIProvider(),
    geocoded;

  function beforeAll() {
    runs(function () {
      provider.geocode("1600 Pennsylvania Ave, Washington, DC", function(result) {
        if (result && result.length) {
          geocoded = result[0];
        }
      });
    });
    waitsFor(function () {
      return geocoded;
    }, "Timed out while trying to fetch geocode data.", 1000);
  };

  beforeEach(function () {
    if (!geocoded) {
      beforeAll();
    }
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
    expect(geocoded.getCity()).toEqual("Washington");
  });

  it ("maps region correctly", function() {
    expect(geocoded.getRegion()).toEqual("District of Columbia");
  });

  it ("maps postal code correctly", function() {
    expect(geocoded.getZipcode()).toEqual("20500");
  });
});
