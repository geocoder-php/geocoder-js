if (typeof GeocoderJS === "undefined" && typeof require === "function") {
  var GeocoderJS = require("../GeocoderJS.js");
  require("../ExternalURILoader.js");
}

;(function (GeocoderJS) {
  "use strict";

  GeocoderJS.ProviderFactory = function() {};

  /**
   * Creates new Geocoder Provider instances.
   * @options
   *   Either a string representing the registered provider, or an object with the
   *   following settings for instigating providers.
   *     - provider: A string representing the registered provider.
   * @return
   *   An object compatable with the ProviderBase class, or undefined if there's
   *   not a registered provider.
   */
  GeocoderJS.ProviderFactory.prototype.createProvider = function(options) {
    if (typeof options === "string") {
      options = {
        'provider': options
      };
    }

    var provider;
    var externalLoader = new GeocoderJS.ExternalURILoader();

    switch (options.provider) {
      case 'google':
        provider = new GeocoderJS.GoogleAPIProvider(options);
        break;
      case 'mapquest':
        provider = new GeocoderJS.MapquestProvider(options);
        break;
      case 'openstreetmap':
        provider = new GeocoderJS.OpenStreetMapProvider(externalLoader, options);
        break;
    }

    return provider;
  };

})(GeocoderJS);
