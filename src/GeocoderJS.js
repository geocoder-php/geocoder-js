var container = (typeof window === "object") ? window : (typeof exports === "object") ? exports : {};

;(function (container) {
    "use strict";

    var GeocoderJS = {};
    GeocoderJS.version = '0.1-dev';

    container.GeocoderJS = GeocoderJS;

})(container);

// Define GeocoderJS as an AMD module.
if (typeof define === 'function' && define.amd) {
  define(GeocoderJS);
}
