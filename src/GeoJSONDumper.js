;(function (GeocoderJS) {
    "use strict";
    
    var baseGeoJSON = {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": []
      }
    };

    GeocoderJS.GeoJSONDumper = function() {
      return {
        dump: function(geocoded) {
          var result = baseGeoJSON;
          result.geometry.coordinates = [geocoded.getLongitude(), geocoded.getLatitude()];
          return result;
        }
      };
    };

})(GeocoderJS);



