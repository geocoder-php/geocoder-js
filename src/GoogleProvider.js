var GoogleProvider = function() {};

GoogleProvider.prototype = new ProviderBase();
GoogleProvider.prototype.constructor = GoogleProvider;

GoogleProvider.prototype.geocode = function(searchString) {
  var that = this;
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({'address': searchString}, function(results, status) {
    var geoCoded = that.mapToGeocoded(results[0]);
  });
};

GoogleProvider.prototype.prepareCall = function() {

};

GoogleProvider.prototype.mapToGeocoded = function(result) {
  console.log(result);
  var geocoded = new Geocoded();
  geocoded.latitude = result.geometry.location.lat();
  geocoded.longitude = result.geometry.location.lng();

  geocoded.streetNumber = result.address_components[0].long_name;
  geocoded.streetName = result.address_components[1].long_name;
  return geocoded;
};