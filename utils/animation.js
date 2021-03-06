export function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function range(_start, _end, step = 1) {
  const output = [];
  let start = _start;
  let end = _end;

  if (typeof end === 'undefined') {
    end = start;
    start = 0;
  }

  for (let i = start; i < end; i += step) {
    output.push(i);
  }

  return output;
}

export function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}

export function randomPointNearRect(_x, _y, _w, _h, minDist = 0, maxDist = 0) {
  let x = _x;
  let y = _y;
  let w = _w;
  let h = _h;

  const dist = Math.random() * (maxDist - minDist) + minDist;
  x += dist;
  y += dist;
  w -= dist * 2;
  h -= dist * 2;

  if (Math.random() < w / (w + h)) {
    // top bottom
    x = Math.random() * w + x;
    y = Math.random() < 0.5 ? y : y + h - 1;
  } else {
    y = Math.random() * h + y;
    x = Math.random() < 0.5 ? x : x + w - 1;
  }
  return [x || 0, y || 0];
}

export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/By_example/Detect_WebGL
export function detectWebGLContext() {
  const canvas = document.createElement('canvas');
  const gl =
    canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  return gl && gl instanceof WebGLRenderingContext;
}
