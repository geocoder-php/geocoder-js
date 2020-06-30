import ExternalURILoader from "ExternalURILoader";

describe("ExternalURILoader", () => {
  const loader = new ExternalURILoader();

  it("has executeRequest method", () => {
    expect(loader.executeRequest).toBeDefined();
  });
});
