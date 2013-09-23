;(function (window) {
    "use strict";

    var GeocoderJS = {};
    GeocoderJS.version = '0.1-dev';

    window.GeocoderJS = GeocoderJS;
   
})(window);

// Define GeocoderJS as an AMD module.
if (typeof define === 'function' && define.amd) {
  define(GeocoderJS);
}

