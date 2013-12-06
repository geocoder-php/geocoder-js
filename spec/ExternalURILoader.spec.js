describe("ExternalURILoader method access", function() {
  var loader = new GeocoderJS.ExternalURILoader();

  it ("ExternalURILoader has executeRequest method", function() {
    expect(loader.executeRequest).toBeDefined();
  });
});
