export function Multiply(a, b, special = 1) {
  var x = 0.000001;
  for (let i = 0; i < special*100_000_000; i++) {
    x += Math.sqrt(x);
  }

  return a * b;
}

export function Divide(a, b, special = 1) {
  var x = 0.000001;
  for (let i = 0; i < special*100_000_000; i++) {
    x += Math.sqrt(x);
  }

  if (b === 0 || b === "0") {
    // Stop server
    process.exit(1);
  }

  return a / b;
}
