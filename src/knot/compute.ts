import type { FlatKnotPoint, TrefoilKnotParaFunc } from './type';

const normalPlane = {
  x: (t: number, u: number, v: number) =>
    trefoilKnot.x(t) + (-Math.sin(t) + 4 * Math.sin(2 * t)) * u + (Math.cos(t) - 2 * Math.cos(2 * t)) * v,
  y: (t: number, u: number, v: number) =>
    trefoilKnot.y(t) + (Math.cos(t) + 4 * Math.cos(2 * t)) * u + (Math.sin(t) - 2 * Math.sin(2 * t)) * v,
  z: (t: number, u: number, v: number) =>
    trefoilKnot.z(t) + (Math.sin(t) - 2 * Math.sin(2 * t)) * u + (Math.cos(t) - 2 * Math.cos(2 * t)) * v,
};

const circleOnPlane = {
  x: (t: any, r: number, theta: number) => normalPlane.x(t, r * Math.cos(theta), r * Math.sin(theta)),
  y: (t: any, r: number, theta: number) => normalPlane.y(t, r * Math.cos(theta), r * Math.sin(theta)),
  z: (t: any, r: number, theta: number) => normalPlane.z(t, r * Math.cos(theta), r * Math.sin(theta)),
};

export function sphericalShellCoordinates(
  a: number,
  b: number,
  c: number,
  r: number,
  theta: number,
  phi: number
): FlatKnotPoint {
  const x: number = a + r * Math.sin(theta) * Math.cos(phi);
  const y: number = b + r * Math.sin(theta) * Math.sin(phi);
  const z: number = c + r * Math.cos(theta);
  return [x, y, z];
}

export const trefoilKnot: TrefoilKnotParaFunc = {
  x: (t: number) => Math.sin(t) + 2 * Math.sin(2 * t),
  y: (t: number) => Math.cos(t) - 2 * Math.cos(2 * t),
  z: (t: number) => -Math.sin(3 * t),
  dx: (t: number) => Math.cos(t) + 4 * Math.cos(2 * t),
  dy: (t: number) => -Math.sin(t) + 4 * Math.sin(2 * t),
  dz: (t: number) => -3 * Math.cos(3 * t),
};
