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
    var geocoded = new GeocoderJS.Geocoded(),
        component, point, addressMetaData,
        addressComponents, i, tmpKind, tmpName, bounds;

    point = result.Point.pos.split(' ');
    geocoded.latitude = point[1] * 1;
    geocoded.longitude = point[0] * 1;

    bounds = parseBounds(result.boundedBy);
    if(bounds) {
        geocoded.bounds = bounds;
    }

    if(!result.metaDataProperty.GeocoderMetaData) {
      return geocoded;
    }

    addressMetaData = result.metaDataProperty.GeocoderMetaData;
    addressComponents = addressMetaData.Address.Components;

    if (addressMetaData.AddressDetails.Country) {
        geocoded.country_code = addressMetaData.AddressDetails.Country.CountryNameCode;
    }

    for (i in addressComponents) {
      if(!addressComponents.hasOwnProperty(i)) {
        continue;
      }

      component = addressComponents[i];
      tmpKind = component.kind;
      tmpName = component.name;
      switch (tmpKind) {
        case 'country':
          geocoded.countryName = tmpName;
          break;
        case 'locality':
          geocoded.city = tmpName;
          break;
        case 'province':
          geocoded.region = tmpName;
          break;
        case 'area':
          geocoded.region_area = tmpName;
          break;
        case 'street':
          geocoded.streetName = tmpName;
          break;
        case 'house':
          geocoded.streetNumber = tmpName;
          break;
        default:
          geocoded.other[tmpKind] = tmpName;
      }
    }

    console.log(geocoded);

    return geocoded;
  };

  function parseBounds(boundary) {
    var boundedTypes = ['Envelope'],
        boundType, boundData, i
    ;

    for (i in boundedTypes) {
      if(!boundedTypes.hasOwnProperty(i)) {
        continue;
      }

      boundType = boundedTypes[i];
      if(!boundary.hasOwnProperty(boundType)) {
        continue;
      }

      boundData = boundary[boundType];
      break;
    }

    switch (boundType) {
      case 'Envelope':
        return parseEnvelopeBound(boundData);
    }
  }

  function parseEnvelopeBound(boundData) {
    var lowerCorner, upperCorner,
      x1, y1, x2, y2, tmp
    ;

    upperCorner = boundData.upperCorner;
    lowerCorner = boundData.lowerCorner;

    tmp = lowerCorner.split(" ");
    y1 = tmp[0] * 1;
    x1 = tmp[1] * 1;

    tmp = upperCorner.split(" ");
    y2 = tmp[0] * 1;
    x2 = tmp[1] * 1;

    return [
        [x1, y1],
        [x2, y2]
    ];
  }

})(GeocoderJS);
