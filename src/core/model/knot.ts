interface KnotType {
  r: number;
  x: number;
  y: number;
  z: number;
}

type FlatKnotPoint = [number, number, number];

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

class Knot implements KnotType {
  constructor(public r: number, public x: number, public y: number, public z: number) {}

  static rotate(r: number, [x, y, z]: FlatKnotPoint): FlatKnotPoint {
    // r is in [0-360]
    const radius = (Math.PI * r) / 180;

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
    for (let i = 0; i < 180; i += 20) {
      for (let j = 0; j < 360; j += 20) {
        const [x, y, z] = sphericalShellCoordinates(a, b, c, 50, (Math.PI * i) / 180, (Math.PI * j) / 180);
        points.push([x, y, z]);
      }
    }

    return points;
  }

  toPoint(): FlatKnotPoint {
    return [this.x, this.y, this.z];
  }

  update(t: number): FlatKnotPoint {
    return [this.r * trefoilKnot.x(t), this.r * trefoilKnot.y(t), this.r * trefoilKnot.z(t)];
  }
}

function sphericalShellCoordinates(
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

interface TrefoilKnotParaFunc {
  x: (t: number) => number;
  y: (t: number) => number;
  z: (t: number) => number;
  dx: (t: number) => number;
  dy: (t: number) => number;
  dz: (t: number) => number;
}

const trefoilKnot: TrefoilKnotParaFunc = {
  x: (t: number) => Math.sin(t) + 2 * Math.sin(2 * t),
  y: (t: number) => Math.cos(t) - 2 * Math.cos(2 * t),
  z: (t: number) => -Math.sin(3 * t),
  dx: (t: number) => Math.cos(t) + 4 * Math.cos(2 * t),
  dy: (t: number) => -Math.sin(t) + 4 * Math.sin(2 * t),
  dz: (t: number) => -3 * Math.cos(3 * t),
};

const knot = new Knot(200, 1, 1, 1);

export function requestFrameData(f: number) {
  const points = [];
  for (let i = 0; i < 130; i++) {
    const point = knot.update(i);
    // center point shape
    points.push(Knot.rotate(f, point));
    // the distributed ring points group
    const rings = Knot.ring(i, point);
    points.push(...rings.map((p) => Knot.rotate(f, p)));
    // if (i === 100) {
    // }
  }

  return points;
}

`
a 3d model is a group of points.

when drawing a 3d shape with parameter function, you should output all the values from a given t range.
but how large is the range is unclear right now, and it's called the period of the parameter function.

when drawing a spinning 3d shape, you will have a new parameter showing the time or frame indicator.

in this project we will use a frame indicator to generate the shape in one frame.

for every t, you will have to generate the shape(which means you generate all the points within a period) and draw it into a canvas.

this part may cost a lot of time, so we can compute it in web worker thread.

also, we can use offscreen canvas to paint the shape of every frame in the worker thread and put the image to main thread in just one paint api.

so we will need a communication method between main thread and worker thread.

need to be noticed that the worker thread may not synchronized with main thread, so we should to ensure that we have a correct frame image when we are fetching it from worker thread.

`;
