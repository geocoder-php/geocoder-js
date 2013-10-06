if (typeof GeocoderJS === "undefined" && typeof require === "function") {
  var GeocoderJS = require("../GeocoderJS.js");
}

;(function (GeocoderJS, GoogleGeocoder) {
    "use strict";

    GeocoderJS.GoogleProvider = function() {};

    GeocoderJS.GoogleProvider.prototype = new GeocoderJS.ProviderBase();
    GeocoderJS.GoogleProvider.prototype.constructor = GeocoderJS.GoogleProvider;

    GeocoderJS.GoogleProvider.prototype.geocode = function(searchString, callback) {
      var that = this;
      that.callback = callback;
      var geocoder = GoogleGeocoder;
      geocoder.geocode({'address': searchString}, function(results, status) {
        console.log(results);
        var geoCoded = that.mapToGeocoded(results[0]);
        that.callback(geoCoded);
      });
    };

    GeocoderJS.GoogleProvider.prototype.prepareCall = function() {

    };

    GeocoderJS.GoogleProvider.prototype.mapToGeocoded = function(result) {
      var geocoded = new GeocoderJS.Geocoded();
      geocoded.latitude = result.geometry.location.lat();
      geocoded.longitude = result.geometry.location.lng();

      for (var i in result.address_components) {
        for (var j in result.address_components[i].types) {
          switch (result.address_components[i].types[j]) {
            case "street_number":
              geocoded.streetNumber = result.address_components[i].long_name;
              break;
            case "route":
              geocoded.streetName = result.address_components[i].long_name;
              break;
            case "locality":
              geocoded.city = result.address_components[i].long_name;
              break;
            case "administrative_area_level_1":
              geocoded.region = result.address_components[i].long_name;
              break;
            case "postal_code":
              geocoded.postal_code = result.address_components[i].long_name;
              break;
          }
        }
      }
      return geocoded;
    };

    GeocoderJS.GoogleProvider.prototype.getGeocoder = function() {
      return GoogleGeocoder;
    };

})(GeocoderJS, new google.maps.Geocoder());
