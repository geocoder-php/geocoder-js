;(function () {
    "use strict";

    var GeocoderJS = {};
    GeocoderJS.version = '0.0.0';

    GeocoderJS.createGeocoder = function(options) {
      var factory = new GeocoderJS.ProviderFactory();
      return factory.createProvider(options);
    };

    var container = (typeof exports === "object") ? exports : (typeof window === "object") ? window : {};
    container.GeocoderJS = GeocoderJS;
})();

// Define GeocoderJS as an AMD module.
if (typeof define === 'function' && define.amd) {
  define(GeocoderJS);
}
