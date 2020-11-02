import ExternalLoader from "ExternalLoader";

describe("ExternalLoader", () => {
  const loader = new ExternalLoader();

  it("has executeRequest method", () => {
    expect(loader.executeRequest).toBeDefined();
  });
});
