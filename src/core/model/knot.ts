interface KnotType {
  r: number;
  x: number;
  y: number;
  z: number;
}

class Knot implements KnotType {
  constructor(public r: number, public x: number, public y: number, public z: number) {}

  toPoint() {
    return [this.x, this.y, this.z];
  }

  update(t: number) {
    this.x = this.r * trefoilKnot.x(t);
    this.y = this.r * trefoilKnot.y(t);
    this.z = this.r * trefoilKnot.z(t);
  }
}

interface TrefoilKnotParaFunc {
  x: (t: number) => number;
  y: (t: number) => number;
  z: (t: number) => number;
}

const trefoilKnot: TrefoilKnotParaFunc = {
  x: (t: number) => Math.sin(t) + 2 * Math.sin(2 * t),
  y: (t: number) => Math.cos(t) - (2 + Math.cos(2 * t)),
  z: (t: number) => -Math.sin(3 * t),
};

export function requestFrameData() {
  const knot = new Knot(100, 0, 0, 0);
  const points = [];
  for (let i = 0; i < 500; i++) {
    knot.update(i);
    points.push(knot.toPoint());
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