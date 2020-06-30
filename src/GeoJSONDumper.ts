import Geocoded from "Geocoded";

export interface GeoJson {
  type: "Feature";
  properties: Record<string, unknown>;
  geometry: {
    type: "Point";
    coordinates: [number | undefined, number | undefined];
  };
}

export default class GeoJsonDumper {
  private baseGeoJson: GeoJson = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "Point",
      coordinates: [undefined, undefined],
    },
  };

  public dump(geocoded: Geocoded): GeoJson {
    const result = this.baseGeoJson;
    result.geometry.coordinates = [
      geocoded.getLongitude(),
      geocoded.getLatitude(),
    ];

    return result;
  }
}
