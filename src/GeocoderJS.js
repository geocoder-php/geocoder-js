;(function () {
    "use strict";

    var GeocoderJS = {};
    GeocoderJS.version = '0.0.0';

    GeocoderJS.createGeocoder = function(options) {
      var factory = new GeocoderJS.ProviderFactory();
      return factory.createProvider(options);
    };

    var container = (typeof window === "object") ? window : (typeof exports === "object") ? exports : {};
    container.GeocoderJS = GeocoderJS;
})();

// Define GeocoderJS as an AMD module.
if (typeof define === 'function' && define.amd) {
  define(GeocoderJS);
}
