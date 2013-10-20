if (typeof GeocoderJS === "undefined" && typeof require === "function") {
  var GeocoderJS = require("../GeocoderJS.js");
}

;(function (GeocoderJS) {
    "use strict";

    GeocoderJS.MapquestProvider = function() {};

    GeocoderJS.MapquestProvider.prototype = new GeocoderJS.ProviderBase();
    GeocoderJS.MapquestProvider.prototype.constructor = GeocoderJS.MapquestProvider;

    GeocoderJS.MapquestProvider.prototype.mapToGeocoded = function(result) {
      var geocoded = new GeocoderJS.Geocoded();
      geocoded.latitude = result.latLng.lat;
      geocoded.longitude = result.latLng.lng;

      return geocoded;
    };
})(GeocoderJS);
