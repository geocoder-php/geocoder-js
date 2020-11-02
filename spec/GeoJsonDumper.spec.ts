import Geocoded from "Geocoded";
import GeoJsonDumper, { GeoJson } from "GeoJsonDumper";

describe("GeoJSON Dumper", () => {
  const geocoded = Geocoded.create({
    coordinates: {
      latitude: 38.8978378,
      longitude: -77.0365123,
    },
    bounds: {
      latitudeSW: 38.89380528242933,
      longitudeSW: -77.04317326462667,
      latitudeNE: 38.90153071757068,
      longitudeNE: -77.02993873537334,
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
    bbox: [
      -77.04317326462667,
      38.89380528242933,
      -77.02993873537334,
      38.90153071757068,
    ],
  };

  it("provides a valid GeoJSON dump", () => {
    expect(GeoJsonDumper.dump(geocoded)).toEqual(expectedGeoJson);
  });
});
