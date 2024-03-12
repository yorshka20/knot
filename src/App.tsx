import { useEffect, useRef } from 'react';
import './App.css';
import { requestFrameData } from './core/model/knot';

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

    canvas.width = 400 * pixelRatio;
    canvas.height = 400 * pixelRatio;

    canvas.style.width = `${400}px`;
    canvas.style.height = `${400}px`;

    container.append(canvas);

    render(canvas, 400 * pixelRatio, 400 * pixelRatio);

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

    ctx.translate(x / 2, y / 2 + 50);

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
