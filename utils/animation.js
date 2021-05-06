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
