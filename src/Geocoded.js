if (typeof GeocoderJS === "undefined" && typeof require === "function") {
  var GeocoderJS = require("./GeocoderJS.js");
}

;(function (GeocoderJS) {
  "use strict";

  GeocoderJS.Geocoded = function() {};

  GeocoderJS.Geocoded.prototype = {
    getCoordinates: function() {return[this.latitude, this.longitude];},
    getLatitude: function() {return this.latitude;},
    getLongitude: function() {return this.longitude;},
    getBounds: function() {},
    getStreetNumber: function() {return this.streetNumber;},
    getStreetName: function() {return this.streetName;},
    getCity: function() {return this.city;},
    getZipcode: function() {return this.postal_code;},
    getCityDistrict: function() {},
    getCounty: function() {},
    getCountyCode: function() {},
    getRegion: function() {return this.region;}
  };

})(GeocoderJS);
