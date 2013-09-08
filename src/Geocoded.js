var Geocoded = function() {};

Geocoded.prototype = {
  getCoordinates: function() {return[this.latitude, this.longitude];},
  getLatitude: function() {return this.latitude;},
  getLongitude: function() {return this.longitude;},
  getBounds: function() {},
  getStreetNumber: function() {return this.streetNumber;},
  getStreetName: function() {return this.streetName;},
  getCity: function() {},
  getZipcode: function() {},
  getCityDistrict: function() {},
  getCounty: function() {},
  getCountyCode: function() {},
  getRegion: function() {}
};