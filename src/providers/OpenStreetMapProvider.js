if (typeof GeocoderJS === "undefined" && typeof require === "function") {
  var GeocoderJS = require("../GeocoderJS.js");
  require("../Geocoded.js");
  require("../ExternalURILoader.js");
  require("../providers/ProviderBase.js");
}

;(function (GeocoderJS) {
  "use strict";

  GeocoderJS.OpenStreetMapProvider = function(_externalLoader) {
    if (_externalLoader === undefined) {
      throw "No external loader defined.";
    }
    this.externalLoader = _externalLoader;

    GeocoderJS.OpenStreetMapProvider.prototype = new GeocoderJS.ProviderBase();
    GeocoderJS.OpenStreetMapProvider.prototype.constructor = GeocoderJS.GoogleAPIProvider;
  };

  GeocoderJS.OpenStreetMapProvider.prototype.geocode = function(searchString, callback) {
    this.externalLoader.setOptions({
      protocol: 'http',
      host: 'nominatim.openstreetmap.org',
      pathname: 'search'
    });

    var params = {
      format: 'json',
      q: searchString,
      addressdetails: 1
    };

    this.executeRequest(params, callback);
  };

  GeocoderJS.OpenStreetMapProvider.prototype.geodecode = function(latitude, longitude, callback) {
    this.externalLoader.setOptions({
      protocol: 'http',
      host: 'nominatim.openstreetmap.org',
      pathname: 'reverse'
    });

    var params = {
      format: 'json',
      lat: latitude,
      lon: longitude,
      addressdetails: 1,
      zoom: 18
    };

    var _this = this;

    this.externalLoader.executeRequest(params, function(data) {
      var results = [];
      results.push(_this.mapToGeocoded(data));
      callback(results);
    });
  };

  GeocoderJS.OpenStreetMapProvider.prototype.executeRequest = function(params, callback) {
    var _this = this;

    this.externalLoader.executeRequest(params, function(data) {
      var results = [];
      for (var i in data) {
        results.push(_this.mapToGeocoded(data[i]));
      }
      callback(results);
    });
  };

  GeocoderJS.OpenStreetMapProvider.prototype.mapToGeocoded = function(result) {
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
