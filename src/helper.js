function compare(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateGrid(height, width, filler) {
  return Array(height)
    .fill()
    .map((row) => Array(width).fill(filler));
}

export { compare, random, generateGrid };
