import { useEffect, useRef } from 'react';
import './App.css';
import { requestFrameData } from './core/model/knot';

const size = 800;

function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.id = 'canvas';

    const pixelRatio = getPixelRatio();

    canvas.width = size * pixelRatio;
    canvas.height = size * pixelRatio;

    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    container.append(canvas);

    render(canvas, size * pixelRatio, size * pixelRatio);

    return () => {
      container.removeChild(canvas);
    };
  }, []);

  return <div ref={containerRef} className='container'></div>;
}

export default App;

export function getPixelRatio() {
  return Math.max(2, window.devicePixelRatio);
}

function render(canvas: HTMLCanvasElement | undefined, x: number, y: number) {
  if (!canvas) {
    return;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return;
  }

  let frame = 0;

  function loop(ctx: CanvasRenderingContext2D) {
    frame++;
    if (frame >= 360) {
      frame = 0;
    }

    ctx.save();

    ctx.clearRect(0, 0, x, y);
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, x, y);

    ctx.fillStyle = 'black';

    ctx.translate(x / 2, y / 2);

    const points = requestFrameData(frame);
    // console.log('points', points);
    points.forEach((point) => {
      ctx.beginPath();
      ctx.arc(point[0], point[1], 1, 0, 2 * Math.PI);
      ctx.fill();
    });

    ctx.restore();

    requestAnimationFrame(() => loop(ctx));
  }

  loop(ctx);
}
