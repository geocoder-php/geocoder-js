import Geocoded from "Geocoded";
import AdminLevel, { AdminLevelObject } from "AdminLevel";

export interface GeoJson {
  readonly type: "Feature";
  readonly properties: {
    readonly [property: string]:
      | string
      | string[]
      | number
      | boolean
      | AdminLevel[]
      | AdminLevelObject[]
      | undefined;
  };
  readonly geometry: {
    readonly type: "Point";
    readonly coordinates: [number | undefined, number | undefined];
  };
  readonly bounds?: {
    readonly south: number;
    readonly west: number;
    readonly north: number;
    readonly east: number;
  };
}

export default class GeoJsonDumper {
  private static baseGeoJson: GeoJson = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "Point",
      coordinates: [undefined, undefined],
    },
  };

  public static dump(geocoded: Geocoded): GeoJson {
    let result = GeoJsonDumper.baseGeoJson;
    result = {
      ...result,
      ...{
        geometry: {
          ...result.geometry,
          coordinates: [geocoded.getLongitude(), geocoded.getLatitude()],
        },
      },
    };
    const {
      latitude,
      longitude,
      south,
      west,
      north,
      east,
      adminLevels,
      ...geocodedProperties
    } = geocoded.toObject();

    let properties: {
      [property: string]:
        | string
        | string[]
        | number
        | boolean
        | AdminLevel[]
        | AdminLevelObject[]
        | undefined;
    } = { ...geocodedProperties };
    Object.keys(properties).forEach(
      (property) =>
        properties[property] === undefined && delete properties[property]
    );

    if (adminLevels && adminLevels.length > 0) {
      properties = {
        ...properties,
        adminLevels: adminLevels.map((adminLevel) => adminLevel.toObject()),
      };
    }

    result = { ...result, properties };
    if (south && west && north && east) {
      result = { ...result, bounds: { south, west, north, east } };
    }

    return result;
  }
}
