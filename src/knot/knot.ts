import { Knot } from './model';

const knot = new Knot(200, 1, 1, 1);

const step = (2 * Math.PI) / 360;

export function requestFrameData(f: number) {
  const points = [];
  for (let i = 0; i < 2 * Math.PI; i += 3 * step) {
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
