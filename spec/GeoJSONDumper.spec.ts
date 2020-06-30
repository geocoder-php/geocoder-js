import Geocoded from "Geocoded";
import GeoJSONDumper, { GeoJson } from "GeoJSONDumper";

describe("GeoJSON Dumper", () => {
  const geocoded = Geocoded.create({
    latitude: 38.8978378,
    longitude: -77.0365123,
  });
  const dumper = new GeoJSONDumper();

  const expectedGeoJson: GeoJson = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "Point",
      coordinates: [-77.0365123, 38.8978378],
    },
  };

  it("provides a valid geojson dump", () => {
    expect(dumper.dump(geocoded)).toEqual(expectedGeoJson);
  });
});
