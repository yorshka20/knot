import { sphericalShellCoordinates, trefoilKnot } from './compute';
import type { FlatKnotPoint, KnotType } from './type';

export class Knot implements KnotType {
  constructor(public r: number, public x: number, public y: number, public z: number) {}

  static rotate(r: number, [x, y, z]: FlatKnotPoint): FlatKnotPoint {
    // r is in [0-360]
    const radius = (Math.PI * r) / 4 / 180;

    // rotate against y axis

    return [x * Math.cos(radius) + z * Math.sin(radius), y, z * Math.cos(radius) - x * Math.sin(radius)];
  }

  static ring(t: number, point: FlatKnotPoint): FlatKnotPoint[] {
    const points: FlatKnotPoint[] = [];
    const [a, b, c] = point;

    // vertical surface function: n1(x-a)+n2(y-b)+n3(z-c)=0
    // n = (v2, -v1, 0)
    // deviated v
    // const [a, b, c] = [trefoilKnot.x(t), trefoilKnot.y(t), trefoilKnot.z(t)];
    // const [dx, dy, dz] = [trefoilKnot.dx(t), trefoilKnot.dy(t), trefoilKnot.dz(t)];
    // // dy * x - dx * y = 0.
    // // dx * (x-a) + dy * (y-b) + dz * (z-c) = 0.
    // for (let nx = -100; nx < 100; nx += 5) {
    //   const ny = (dy / dx) * (nx - a) + b;
    //   const nz = Math.sqrt(400 - (nx - a) * (nx - a) - (ny - b) * (ny - b)) + c;
    //   points.push([nx, ny, nz]);
    // }

    `

		get from claude and chatGPT.
		chatGPT gets the wrong answer while claude gets the right one.

		1.
		x = Math.sin(t) + 2Math.sin(2t) + rcos(θ)
		y = Math.cos(t) - 2Math.cos(2t) + rsin(θ)
		z = -Math.sin(3*t)

		or
		
		2.
		x = Math.sin(t) + 2Math.sin(2t) + (-Math.sin(t) + 4Math.sin(2t))rcos(θ) + (Math.cos(t) - 2Math.cos(2t))rsin(θ)
		y = Math.cos(t) - 2Math.cos(2t) + (Math.cos(t) + 4Math.cos(2t))rcos(θ) + (Math.sin(t) - 2Math.sin(2t))rsin(θ)
		z = -Math.sin(3t) + (Math.sin(t) - 2Math.sin(2t))rcos(θ) + (Math.cos(t) - 2Math.cos(2*t))rsin(θ)
		`;

    // const r = 50;
    // let d = 0;
    // for (let i = 0; i < 360; i += 20) {
    //   const x = circleOnPlane.x(i, r, (Math.PI * i) / 180);
    //   const y = circleOnPlane.y(i, r, (Math.PI * i) / 180);
    //   const z = circleOnPlane.z(i, r, (Math.PI * i) / 180);
    //   d += 20;
    //   points.push([x, y, z]);
    // }

    // cheat: drawing a sphericalShell

    // console.log([a, b, c]);
    // for (let i = 0; i < 180; i += 20) {
    const i = 30;
    for (let j = 0; j < 360; j += 20) {
      const [x, y, z] = sphericalShellCoordinates(a, b, c, 50, (Math.PI * (i + j)) / 180, (Math.PI * j) / 180);
      points.push([x, y, z]);
    }
    // }

    return points;
  }

  toPoint(): FlatKnotPoint {
    return [this.x, this.y, this.z];
  }

  update(t: number): FlatKnotPoint {
    return [this.r * trefoilKnot.x(t), this.r * trefoilKnot.y(t), this.r * trefoilKnot.z(t)];
  }
}
