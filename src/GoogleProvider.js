var GoogleProvider = function() {};

GoogleProvider.prototype = new ProviderBase();
GoogleProvider.prototype.constructor = GoogleProvider;

GoogleProvider.prototype.geocode = function(searchString) {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({'address': searchString}, function(results, status) {
    console.log(results);
  });
};
