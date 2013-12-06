describe("OpenStreetMap raw result to Geocoded mapping tests", function() {
  var provider = new GeocoderJS.OpenStreetMapProvider(new GeocoderJS.ExternalURILoader()),
    geocoded;

  var stubOpenStreetMapResult = [{
    place_id: "9141060761",
    licence: "Data © OpenStreetMap contributors, ODbL 1.0. http://www.openstreetmap.org/copyright",
    osm_type: "way",
    osm_id: "238241022",
    boundingbox: [
      "38.8974876403809",
      "38.8979148864746",
      "-77.0368804931641",
      "-77.036247253418"
    ],
    lat: "38.89770045",
    lon: "-77.0365643605898",
    display_name: "The White House, 1600, Pennsylvania Avenue Northwest, Foggy Bottom, Farragut Square, Washington, District of Columbia, 20500, United States of America",
    class: "tourism",
    type: "attraction",
    importance: 1.5076757387296,
    icon: "http://nominatim.openstreetmap.org/images/mapicons/poi_point_of_interest.p.20.png",
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
      country_code: "us"
    }
}];

  beforeEach(function () {
    geocoded = provider.mapToGeocoded(stubOpenStreetMapResult[0]);
  });

  it ("receives results from the OpenStreetMap geocoder", function() {
    expect(geocoded).toBeDefined();
  });

  it ("expects coordinates to be set correctly", function() {
    expect(geocoded.getCoordinates()).toEqual([38.89770045, -77.0365643605898]);
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
