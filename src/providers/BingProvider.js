if (typeof GeocoderJS === "undefined" && typeof require === "function") {
  var GeocoderJS = require("../GeocoderJS.js");
  require("../Geocoded.js");
  require("../ExternalURILoader.js");
  require("../providers/ProviderBase.js");
}

;(function (GeocoderJS) {
  "use strict";

  GeocoderJS.BingProvider = function(_externalLoader, options) {
    GeocoderJS.BingProvider.prototype = new GeocoderJS.ProviderBase();
    GeocoderJS.BingProvider.prototype.constructor = GeocoderJS.BingProvider;

    if (_externalLoader === undefined) {
      throw "No external loader defined.";
    }
    this.externalLoader = _externalLoader;

    console.log(options);
    this.apiKey = options.apiKey;
  };

  GeocoderJS.BingProvider.prototype.geocode = function(searchString, callback) {
    this.externalLoader.setOptions({
      protocol: 'http',
      host: 'dev.virtualearth.net',
      pathname: 'REST/v1/Locations'
    });

    var params = {
      q: searchString,
      key: this.apiKey
    };

    this.executeRequest(params, callback);
  };

  GeocoderJS.BingProvider.prototype.geodecode = function(latitude, longitude, callback) {
    this.externalLoader.setOptions({
      protocol: 'http',
      host: 'dev.virtualearth.net',
      pathname: 'REST/v1/Locations/point'
    });

    var params = {
      point: latitude + ', ' + longitude,
      key: this.apiKey
    };

    var _this = this;

    this.externalLoader.executeRequest(params, function(data) {
      var results = [];
      results.push(_this.mapToGeocoded(data));
      callback(results);
    });
  };

  GeocoderJS.BingProvider.prototype.executeRequest = function(params, callback) {
    var _this = this;

    this.externalLoader.executeRequest(params, function(data) {
      var results = [];
      for (var i in data) {
        results.push(_this.mapToGeocoded(data[i]));
      }
      callback(results);
    });
  };

  GeocoderJS.BingProvider.prototype.mapToGeocoded = function(result) {
    var geocoded = new GeocoderJS.Geocoded();

    geocoded.latitude = result.lat * 1;
    geocoded.longitude = result.lon * 1;

    geocoded.streetNumber = (result.address.house_number !== undefined) ? result.address.house_number : undefined;
    geocoded.streetName = result.address.road;
    geocoded.city = result.address.city;
    geocoded.region = result.address.state;
    geocoded.postal_code = result.address.postcode;

    return geocoded;
  };
  
})(GeocoderJS);
