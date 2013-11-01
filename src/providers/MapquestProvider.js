if (typeof GeocoderJS === "undefined" && typeof require === "function") {
  var GeocoderJS = require("../GeocoderJS.js");
}

;(function (GeocoderJS) {
    "use strict";

    GeocoderJS.MapquestProvider = function(options) {
      if (typeof options !== 'object') {
        options = {};
      }

      var defaults = {
        apiKey: ''
      };

      for (var i in defaults) {
        if (options[i] === undefined) {
          options[i] = defaults[i];
        }
      }

      this.apiKey = options.apiKey;
    };

    GeocoderJS.MapquestProvider.prototype = new GeocoderJS.ProviderBase();
    GeocoderJS.MapquestProvider.prototype.constructor = GeocoderJS.MapquestProvider;

    GeocoderJS.MapquestProvider.prototype.geocode = function(searchString, callback) {
      this.executeRequest({"location": searchString}, callback);
    };

    GeocoderJS.MapquestProvider.prototype.mapToGeocoded = function(result) {
      var geocoded = new GeocoderJS.Geocoded();
      geocoded.latitude = result[0].latLng.lat;
      geocoded.longitude = result[0].latLng.lng;

      geocoded.city = result[0].adminArea5;
      geocoded.region = result[0].adminArea4;

      return geocoded;
    };

    GeocoderJS.MapquestProvider.prototype.executeRequest = function(params, callback) {
      var req = new XMLHttpRequest(),
      requestUrl = 'http://open.mapquestapi.com/geocoding/v1/address?outFormat=json&location=' + encodeURIComponent(params.location);

      if (this.apiKey) {
        requestUrl += '&key=' + this.apiKey;
      }

      req.onload = function () {
        if (this.status != 200) {
          console.log("Received HTTP status code " + this.status + " when attempting geocoding request.");
          return callback(null);
        }

        if (!this.responseText || !this.responseText.length) {
          console.log("Received empty data when attempting geocoding request.");
          return callback(null);
        }

        var data = false,
          i = 0,
          results = [];
        try {
          data = JSON.parse(this.responseText);
        }
        catch(e) {
          console.log("Received invalid JSON data when attempting geocoding request.");
          return callback(null);
        }

        if (data && data.info) {
          if (data.status === "OVER_QUERY_LIMIT") {
            console.log("Exceeded daily quota when attempting geocoding request.");
            return callback(null);
          }
          else if (data.info.statuscode === 0 && data.results) {
            for (; i < data.results.length; i++) {
              results.push(GeocoderJS.MapquestProvider.prototype.mapToGeocoded(data.results[i].locations));
            }
            return callback(results);
          }
        }

        console.log("Received unexpected JSON data when attempting geocoding request.");
        return callback(null);
      };

      req.open("GET", requestUrl);
      req.send();
    };
})(GeocoderJS);
