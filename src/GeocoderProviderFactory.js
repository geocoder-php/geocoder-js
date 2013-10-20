if (typeof GeocoderJS === "undefined" && typeof require === "function") {
  var GeocoderJS = require("../GeocoderJS.js");
}

;(function (GeocoderJS) {
  "use strict";

  Geocoder.ProviderFactory = function() {};

  /**
   * 
   */
  Geocoder.ProviderFactory.prototype.createProvider = function(options) {
    if (typeof options === "string") {
      options = {
        'provider': options
      };
    }

    console.log(options);

    var provider;

    switch (options.provider) {
      case 'google':
        provider = new GeocoderJS.GoogleAPIProvider();
        break;
      case 'mapquest':
        provider = new GeocoderJS.MapQuestProvider();
        break;
    }

    return provider;
  };

})(GeocoderJS);