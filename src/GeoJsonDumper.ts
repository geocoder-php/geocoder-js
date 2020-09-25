import Geocoded from "Geocoded";
import AdminLevel, { AdminLevelObject } from "AdminLevel";
import { BoundingBox } from "types";

export interface GeoJson {
  readonly type: "Feature";
  readonly properties: {
    readonly [property: string]:
      | string
      | string[]
      | number
      | boolean
      | BoundingBox
      | AdminLevel[]
      | AdminLevelObject[]
      | undefined;
  };
  readonly geometry: {
    readonly type: "Point";
    readonly coordinates: [number | undefined, number | undefined];
  };
  readonly bounds?: BoundingBox;
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
      bounds,
      adminLevels,
      ...geocodedProperties
    } = geocoded.toObject();

    let properties: {
      [property: string]:
        | string
        | string[]
        | number
        | boolean
        | BoundingBox
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
    if (bounds) {
      result = { ...result, bounds };
    }

    return result;
  }
}
