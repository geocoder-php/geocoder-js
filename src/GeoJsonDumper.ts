import Geocoded from "Geocoded";
import AdminLevel, { AdminLevelObject } from "AdminLevel";
import {
  BoundingBox,
  Coordinates,
  FlatBoundingBox,
  FlatCoordinates,
} from "types";

export interface GeoJson {
  readonly type: "Feature";
  readonly properties: {
    readonly [property: string]:
      | string
      | string[]
      | number
      | boolean
      | Coordinates
      | BoundingBox
      | AdminLevel[]
      | AdminLevelObject[]
      | undefined;
  };
  readonly geometry: {
    readonly type: "Point";
    readonly coordinates: FlatCoordinates;
  };
  readonly bbox?: FlatBoundingBox;
}

export default class GeoJsonDumper {
  private static baseGeoJson: GeoJson = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "Point",
      coordinates: [0, 0],
    },
  };

  public static dump(geocoded: Geocoded): GeoJson {
    let result = GeoJsonDumper.baseGeoJson;
    const {
      coordinates,
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
        | Coordinates
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

    if (coordinates) {
      result = {
        ...result,
        ...{
          geometry: {
            ...result.geometry,
            coordinates: [
              parseFloat(coordinates.longitude.toString()),
              parseFloat(coordinates.latitude.toString()),
            ],
          },
        },
      };
    }

    if (bounds) {
      result = {
        ...result,
        bbox: [
          parseFloat(bounds.longitudeSW.toString()),
          parseFloat(bounds.latitudeSW.toString()),
          parseFloat(bounds.longitudeNE.toString()),
          parseFloat(bounds.latitudeNE.toString()),
        ],
      };
    }

    return result;
  }
}
