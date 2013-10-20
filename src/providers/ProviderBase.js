if (typeof GeocoderJS === "undefined" && typeof require === "function") {
  var GeocoderJS = require("../GeocoderJS.js");
}

;(function (GeocoderJS) {
    "use strict";

    GeocoderJS.ProviderBase = function() {};

    GeocoderJS.ProviderBase.prototype = {
      geocode: function(searchString, callback) {},
      geodecode: function(latitude, longitude, callback) {},
      mapToGeocoded: function(result) {},
      executeRequest: function(params, callback) {}
    };

})(GeocoderJS);
