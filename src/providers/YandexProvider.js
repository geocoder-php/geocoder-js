if (typeof GeocoderJS === "undefined" && typeof require === "function") {
  var GeocoderJS = require("../GeocoderJS.js");
  require("../Geocoded.js");
  require("../providers/ProviderBase.js");
}

;(function (GeocoderJS) {
  "use strict";

  var useSSL;

  GeocoderJS.YandexProvider = function(_externalLoader, options) {
    if (_externalLoader === undefined) {
      throw "No external loader defined.";
    }
    this.externalLoader = _externalLoader;

    options = (options) ? options : {};

    useSSL = (options.useSSL) ? options.useSSL : false;
    this.lang = (options.lang) ? options.lang : 'en-US';
  };

  GeocoderJS.YandexProvider.prototype = new GeocoderJS.ProviderBase();
  GeocoderJS.YandexProvider.prototype.constructor = GeocoderJS.YandexProvider;

  GeocoderJS.YandexProvider.prototype.geocode = function(searchString, callback) {
    this.externalLoader.setOptions({
      protocol: (useSSL === true) ? 'https' : 'http',
      host: 'geocode-maps.yandex.ru',
      pathname: '1.x'
    });

    var options = {
      format: 'json',
      geocode: searchString,
      JSONPCallback: 'callback',
      lang: this.lang
    };

    this.executeRequest(options, callback);
  };

  GeocoderJS.YandexProvider.prototype.geodecode = function(latitude, longitude, callback) {
    this.externalLoader.setOptions({
      protocol: (useSSL === true) ? 'https' : 'http',
      host: 'geocode-maps.yandex.ru',
      pathname: '1.x'
    });

    var options = {
      format: 'json',
      geocode: longitude + ',' + latitude,
      JSONPCallback: 'callback',
      lang: this.lang
    };

    this.executeRequest(options, callback);
  };

  GeocoderJS.YandexProvider.prototype.executeRequest = function(params, callback) {
    var _this = this;

    this.externalLoader.executeRequest(params, function(data) {
      var results = [];

      for (var i in data.response.GeoObjectCollection.featureMember) {
        results.push(_this.mapToGeocoded(data.response.GeoObjectCollection.featureMember[i].GeoObject));
      }
      callback(results);
    });
  };

  GeocoderJS.YandexProvider.prototype.mapToGeocoded = function(result) {
    var geocoded = new GeocoderJS.Geocoded();

    var point = result.Point.pos.split(' ');
    geocoded.latitude = point[1] * 1;
    geocoded.longitude = point[0] * 1;

    if (result.metaDataProperty.GeocoderMetaData.AddressDetails.Country) {
      var tmp = result.metaDataProperty.GeocoderMetaData.AddressDetails.Country;
      if (tmp.AdministrativeArea) {
        tmp = tmp.AdministrativeArea;
        geocoded.region = tmp.AdministrativeAreaName;
        if (tmp.SubAdministrativeArea) {
          tmp = tmp.SubAdministrativeArea;
          if (tmp.Locality) {
            tmp = tmp.Locality;
            geocoded.city = tmp.LocalityName;
            if (tmp.Thoroughfare) {
              tmp = tmp.Thoroughfare;
              geocoded.streetName = tmp.ThoroughfareName;
            }
          }
        }
      }
    }

    return geocoded;
  };
})(GeocoderJS);
