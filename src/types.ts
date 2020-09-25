export type PartialSome<
  O,
  P extends keyof O,
  Q = Omit<O, P>,
  R = { [K in P]?: O[P] }
> = Q & R;

export type Box = [number, number, number, number];

export type Coordinates = {
  readonly latitude: number | string;
  readonly longitude: number | string;
};

export type BoundingBox = {
  // Often South-West (Lower-Left) but also North-West (Upper-Left)
  readonly latitude1: number | string;
  readonly longitude1: number | string;
  // Often North-East (Upper-Right) but also South-East (Lower-Right)
  readonly latitude2: number | string;
  readonly longitude2: number | string;
};
