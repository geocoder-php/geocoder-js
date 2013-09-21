google = {};
google.maps = {};
google.maps.Geocoder = (function() {

  function Geocoder() {}

  Geocoder.prototype.geocode = function(searchString) {
    console.log('searched for ' + searchString);
  };
  
  return Geocoder;
})();