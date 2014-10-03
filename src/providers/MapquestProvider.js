if (typeof GeocoderJS === "undefined" && typeof require === "function") {
  var GeocoderJS = require("../GeocoderJS.js");
}

;(function (GeocoderJS) {
    "use strict";

    GeocoderJS.MapquestProvider = function(_externalLoader, options) {
      if (_externalLoader === undefined) {
        throw "No external loader defined.";
      }
      this.externalLoader = _externalLoader;

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
      this.externalLoader.setOptions({
        protocol: 'http',
        host: 'www.mapquestapi.com',
        pathname: 'geocoding/v1/address'
      });

      var params = {
        key: this.apiKey,
        outputFormat: 'json',
        location: encodeURIComponent(searchString),
        JSONPCallback: 'callback'
      };

      this.executeRequest(params, callback);
    };

    GeocoderJS.MapquestProvider.prototype.mapToGeocoded = function(result) {
      console.log(result);
      var geocoded = new GeocoderJS.Geocoded();
      geocoded.latitude = result.latLng.lat;
      geocoded.longitude = result.latLng.lng;

      geocoded.city = result.adminArea5;
      geocoded.region = result.adminArea4;

      return geocoded;
    };

    GeocoderJS.MapquestProvider.prototype.executeRequest = function(params, callback) {
      var _this = this;

      this.externalLoader.executeRequest(params, function(data) {
        var results = [];
        console.log(data);
        if (data.results[0].locations.length) {
          for (var i in data.results[0].locations) {
            results.push(_this.mapToGeocoded(data.results[0].locations[i]));
          }
        }

        callback(results);
      });
    };
})(GeocoderJS);
