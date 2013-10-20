
var Geocoder = require("../src/GeocoderJS.js"),
  GeocoderProvider = require("../src/providers/GoogleAPIProvider.js");

var gsGeocoder = new Geocoder.GoogleAPIProvider(true);

gsGeocoder.geocode("1600 Pennsylvania Ave, Washington, DC", function(result) {
  console.log(result);
});

gsGeocoder.geodecode("44.915", "-93.21", function(result) {
  console.log(result);
});
