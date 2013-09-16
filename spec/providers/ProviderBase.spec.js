describe("ProviderBase method access", function() {
  var provider = new GeocoderJS.ProviderBase();

  it ("ProviderBase has geocode method", function() {
    expect(provider.geocode).toBeDefined();
  });
});
