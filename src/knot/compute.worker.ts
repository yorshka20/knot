// /// <reference lib="webworker" />

// import { trefoilKnot } from "./compute";

// addEventListener('message', (event) => {
//   const { t } = event.data;
//   const points = [];

//   for (let i = 0; i < 130; i++) {
//     const point = trefoilKnot.update(i, t);
//     points.push(point);
//   }

//   postMessage(points);
// });
