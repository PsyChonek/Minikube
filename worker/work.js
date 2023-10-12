export async function Multiply(a, b, timeout = 1) {
  await delay(timeout * 1000);

  return a * b;
}

export async function Divide(a, b, timeout = 1) {
  await delay(timeout * 1000);

  if (b === 0 || b === "0") {
    // Stop server
    process.exit(1);
  }

  return a / b;
}

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}