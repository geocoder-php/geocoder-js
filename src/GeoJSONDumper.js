var GeoJSONDumper = function() {
  var baseGeoJSON = {
    "type": "Feature",
    "properties": {},
    "geometry": {
      "type": "Point",
      "coordinates": []
    }
  };

  this.dump = function(geocoded) {
    var result = baseGeoJSON;
    result.geometry.coordinates = [geocoded.getLongitude(), geocoded.getLatitude()];
    return result;
  };
};