describe("GeoJSON Dumper", function() {
  var geocoded = new GeocoderJS.Geocoded();
  geocoded.latitude = 38.8978378;
  geocoded.longitude = -77.0365123;
  var dumper = new GeocoderJS.GeoJSONDumper();

  var expectedGeoJSON = {
    "type": "Feature",
    "properties": {},
    "geometry": {
      "type": "Point",
      "coordinates": [
        -77.0365123,
        38.8978378
      ]
    }
  };

  it("provides a valid geojson dump", function() {
    expect(dumper.dump(geocoded)).toEqual(expectedGeoJSON);
  });
});