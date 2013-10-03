;(function (GeocoderJS) {
    "use strict";

    GeocoderJS.MapquestProvider = function() {};

    GeocoderJS.MapquestProvider.prototype = new GeocoderJS.ProviderBase();
    GeocoderJS.MapquestProvider.prototype.constructor = GeocoderJS.MapquestProvider;

    GeocoderJS.MapquestProvider.prototype.mapToGeocoded = function(result) {
      var geocoded = new GeocoderJS.Geocoded();
      console.log("BLAH " + result);
      geocoded.latitude = result.latLng.lat;
      geocoded.longitude = result.latLng.lng;

      return geocoded;
    };
})(GeocoderJS);
