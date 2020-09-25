import Geocoded from "Geocoded";
import GeoJsonDumper, { GeoJson } from "GeoJsonDumper";

describe("GeoJSON Dumper", () => {
  const geocoded = Geocoded.create({
    latitude: 38.8978378,
    longitude: -77.0365123,
    bounds: {
      latitude1: 38.89380528242933,
      longitude1: -77.04317326462667,
      latitude2: 38.90153071757068,
      longitude2: -77.02993873537334,
    },
    formattedAddress:
      "1600 Pennsylvania Avenue Northwest, Washington, DC 20050",
  });

  const expectedGeoJson: GeoJson = {
    type: "Feature",
    properties: {
      formattedAddress:
        "1600 Pennsylvania Avenue Northwest, Washington, DC 20050",
    },
    geometry: {
      type: "Point",
      coordinates: [-77.0365123, 38.8978378],
    },
    bounds: {
      latitude1: 38.89380528242933,
      longitude1: -77.04317326462667,
      latitude2: 38.90153071757068,
      longitude2: -77.02993873537334,
    },
  };

  it("provides a valid GeoJSON dump", () => {
    expect(GeoJsonDumper.dump(geocoded)).toEqual(expectedGeoJson);
  });
});
