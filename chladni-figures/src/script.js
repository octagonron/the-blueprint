// references: https://thelig.ht/chladni/

/* Math part */

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const smoothstep = (value, min, max) => {
  const norm = clamp((value - min) / (max - min), 0, 1);
  return norm * norm * (3 - 2 * norm);
};

const mix = (from, to, rate) => from * (1 - rate) + to * rate;

const chladni = (point, viewport, rate) => {
  const px = (2 * point.x - viewport.x) / viewport.y;
  const py = (2 * point.y - viewport.y) / viewport.y;
  
  // const s1 = [1, 1, 2, 1];
  const s2 = [-4, 4, 1, 4.6];
  const s1 = [1, 1, 7, 2];
  // const s2 = [-2, 1, 4, 4.6];
  
  const a = mix(s1[0], s2[0], rate.x);
  const b = mix(s1[1], s2[1], rate.y);
  const n = mix(s1[2], s2[2], rate.x);
  const m = mix(s1[3], s2[3], rate.y);
  
  const amp = a * Math.sin(Math.PI * n * px) * Math.sin(Math.PI * m * py) + 
              b * Math.sin(Math.PI * m * px) * Math.sin(Math.PI * n * py);
  
  return 1 - smoothstep(Math.abs(amp), 0, 1);
}

/* Visualization part */

const PI_2 = Math.PI * 2;

class Particle {
  constructor(x, y, color, size, edge) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;
    this.edge = edge;
    this.opacity = 1;
  }
  
  draw(ctx) {
    if (this.opacity < 0.05) {
      return;
    }
    
    const center = (this.edge - this.size) * 0.5;
    
    ctx.fillStyle = `hsla(${Math.floor(this.color[0])} ${this.color[1]} ${this.color[2]}% / ${ this.opacity})`;
    ctx.beginPath();
    ctx.arc(
      this.x + center,
      this.y + center,
      this.size * 2,
      0,
      PI_2
    );
    ctx.fill();
    ctx.closePath();
  }
}

const ctx = canvas.getContext('2d');

const state = {
  width: 0,
  height: 0,
  particles: [],
  request: 0,
  gap: 8,
  pixelSize: 8/4,
  lastUpdate: 0,
  interval: 1000 / 60,
};

const init = () => {
  state.particles = [];
  
  const cellsX = Math.floor(state.width / state.gap);
  const cellsY = Math.floor(state.height / state.gap);
  
  let offsetX = state.width - (cellsX * state.gap);
  let offsetY = state.height - (cellsY * state.gap);
  
  offsetX *= 0.5;
  offsetY *= 0.5;
  
  for (let x = 0; x < cellsX; x++) {
    for (let y = 0; y < cellsY; y++) {
      const px = x * state.gap + offsetX;
      const py = y * state.gap + offsetY;
      const rate = (Math.abs(cellsX * 0.5 - x) + Math.abs(cellsY * 0.5 - y)) * Math.PI;
      const color = [rate ** 0.9 % 360, 100, 50];

      state.particles.push(new Particle(px, py, color, state.pixelSize, state.gap));
    }
  }
};

const animate = () => {
  state.request = requestAnimationFrame(animate);
  
  const now = performance.now();
  const diff = now - (state.lastUpdate || 0);

  if (diff < state.interval) {
    return;
  }

  state.lastUpdate = now - (diff % state.interval);
  
  const viewport = {
    x: state.width,
    y: state.height,
  };
  
  state.timer = (state.timer || 0) + 0.015; 
  
  ctx.globalCompositeOperation = "destination-out";
  ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
  ctx.fillRect(0, 0, state.width, state.height);
  
  ctx.globalCompositeOperation = "screen";
  
  state.particles.forEach((particle, index) => {
    const rate = 0.5 * Math.sin(state.timer) + 0.5;
    particle.opacity = chladni(particle, viewport, {
      x: rate,
      y: rate,
    });
    particle.draw(ctx);
  });
};

const resize = () => {
  cancelAnimationFrame(state.request);
  
  const rect = container.getBoundingClientRect();
 
  width = Math.floor(rect.width);
  height = Math.floor(rect.height);
  
  canvas.width = width;
  canvas.height = height;
  
  state.width = width;
  state.height = height;
  
  init();
  animate();
}

new ResizeObserver(resize).observe(container);