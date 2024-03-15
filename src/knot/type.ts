export interface TrefoilKnotParaFunc {
  x: (t: number) => number;
  y: (t: number) => number;
  z: (t: number) => number;
  dx: (t: number) => number;
  dy: (t: number) => number;
  dz: (t: number) => number;
}

export interface KnotType {
  r: number;
  x: number;
  y: number;
  z: number;
}

export type FlatKnotPoint = [number, number, number];
