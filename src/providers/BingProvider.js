if (typeof GeocoderJS === "undefined" && typeof require === "function") {
  var GeocoderJS = require("../GeocoderJS.js");
  require("../Geocoded.js");
  require("../providers/ProviderBase.js");
}

;(function (GeocoderJS) {
  "use strict";

  var useSSL;
  var apiKey;

  GeocoderJS.BingProvider = function(_externalLoader, options) {
    if (_externalLoader === undefined) {
      throw "No external loader defined.";
    }
    this.externalLoader = _externalLoader;

    options = (options) ? options : {};

    useSSL = (options.useSSL) ? options.useSSL : false;
    apiKey = (options.apiKey) ? options.apiKey : null;

    if (apiKey) {
      useSSL = true;
    }
  };

  GeocoderJS.BingProvider.prototype = new GeocoderJS.ProviderBase();
  GeocoderJS.BingProvider.prototype.constructor = GeocoderJS.BingProvider;

  GeocoderJS.BingProvider.prototype.geocode = function(searchString, callback) {
    this.externalLoader.setOptions({
      protocol: (useSSL === true) ? 'https' : 'http',
      host: 'dev.virtualearth.net',
      pathname: 'REST/v1/Locations/' + searchString
    });

    var options = {
      key: apiKey,
      JSONPCallback: 'jsonp',
    };

    this.executeRequest(options, callback);
  };

  GeocoderJS.BingProvider.prototype.geodecode = function(latitude, longitude, callback) {
    this.externalLoader.setOptions({
      protocol: (useSSL === true) ? 'https' : 'http',
      host: 'dev.virtualearth.net',
      pathname: 'REST/v1/Locations/' + latitude + ',' + longitude
    });

    var options = {
      key: apiKey,
      JSONPCallback: 'jsonp',
    };

    this.executeRequest(options, callback);
  };

  GeocoderJS.BingProvider.prototype.executeRequest = function(params, callback) {
    var _this = this;

    this.externalLoader.executeRequest(params, function(data) {
      var results = [];
      for (var i in data.resourceSets[0].resources) {
        results.push(_this.mapToGeocoded(data.resourceSets[0].resources[i]));
      }
      callback(results);
    });
  };

  GeocoderJS.BingProvider.prototype.mapToGeocoded = function(result) {
    var geocoded = new GeocoderJS.Geocoded()

    geocoded.latitude = result.point.coordinates[0];
    geocoded.longitude = result.point.coordinates[1];

    geocoded.streetName = result.address.addressLine;
    geocoded.city = result.address.locality;
    geocoded.region = result.address.adminDistrict;
    geocoded.postal_code = result.address.postalCode;

    return geocoded;
  };
})(GeocoderJS);
