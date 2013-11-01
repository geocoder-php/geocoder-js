describe("Geocoder Factory method tests", function() {
  var factory;
  beforeEach(function() {
    factory = new GeocoderJS.ProviderFactory();
  });

  it ("expects ProviderFactory to exist", function() {
    expect(factory).toBeDefined();
  });

  it ("expects createProvider to return undefined for an unregistered provider", function() {
    provider = factory.createProvider('nonexistantProvider');
    expect(provider).toBeUndefined();
  });

  it ("expects createProvider() to return a GoogleAPIProvider", function() {
    provider = factory.createProvider('google');
    expect(provider).toBeDefined();
  });

  it ("expects createProvider() to return a MapquestProvider", function() {
    provider = factory.createProvider('mapquest');
    expect(provider).toBeDefined();
  });
});
