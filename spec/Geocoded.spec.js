describe("Geocoded method access", function() {
  var provider = new Geocoded();

  it ("ProviderBase has getCoordinates method", function() {
    expect(provider.getCoordinates).toBeDefined();
  });
  it ("ProviderBase has getLatitude method", function() {
    expect(provider.getLatitude).toBeDefined();
  });
  it ("ProviderBase has getLongitude method", function() {
    expect(provider.getLongitude).toBeDefined();
  });
  it ("ProviderBase has getBounds method", function() {
    expect(provider.getBounds).toBeDefined();
  });
  it ("ProviderBase has getStreetNumber method", function() {
    expect(provider.getStreetNumber).toBeDefined();
  });
  it ("ProviderBase has getStreetName method", function() {
    expect(provider.getStreetName).toBeDefined();
  });
  it ("ProviderBase has getCity method", function() {
    expect(provider.getCity).toBeDefined();
  });
  it ("ProviderBase has getZipcode method", function() {
    expect(provider.getZipcode).toBeDefined();
  });
  it ("ProviderBase has getCityDistrict method", function() {
    expect(provider.getCityDistrict).toBeDefined();
  });
  it ("ProviderBase has getCounty method", function() {
    expect(provider.getCounty).toBeDefined();
  });
  it ("ProviderBase has getCountyCode method", function() {
    expect(provider.getCountyCode).toBeDefined();
  });
  it ("ProviderBase has getRegion method", function() {
    expect(provider.getRegion).toBeDefined();
  });
});
