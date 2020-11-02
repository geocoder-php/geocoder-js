export type PartialSome<
  O,
  P extends keyof O,
  Q = Omit<O, P>,
  R = { [K in P]?: O[P] }
> = Q & R;

export type FlatCoordinates = [number, number];

export type FlatBoundingBox = [number, number, number, number];

export type Coordinates = {
  readonly latitude: number | string;
  readonly longitude: number | string;
};

export type BoundingBox = {
  // South-West (Lower-Left, minY-minX, minLat-minLon, SouthLatitude-WestLongitude)
  readonly latitudeSW: number | string;
  readonly longitudeSW: number | string;
  // North-East (Upper-Right, maxY-maxX, maxLat-maxLon, NorthLatitude-EastLongitude)
  readonly latitudeNE: number | string;
  readonly longitudeNE: number | string;
};
