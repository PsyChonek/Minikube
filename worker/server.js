// Import the framework and instantiate it
import Fastify from "fastify";
const fastify = Fastify({
  logger: true,
});

fastify.register(import("@fastify/rate-limit"), {
  max: 1,
  timeWindow: "1 minute",
  global: true,
});

// Declare a route
var isWorking = false;

// Multiply get values from query string
fastify.get("/multiply", async (request, reply) => {
  if (isWorking) {
    reply.send({ error: "Server is busy" });
    return;
  }
  isWorking = true;
  const { a, b, timeout } = request.query;
  delay(timeout * 1000).then(() => {
    isWorking = false;
  });
  reply.send({ data: a * b });
});

// Divide get values from query string
fastify.get("/divide",  async (request, reply) => {
  if (isWorking) {
    reply.send({ error: "Server is busy" });
    return;
  }
  isWorking = true;
  const { a, b, timeout } = request.query;
  delay(timeout * 1000).then(() => {
    isWorking = false;
  });
  if (b === 0 || b === "0") {
    // Stop server
    process.exit(1);
  }
  reply.send({ data: a / b });
});

// Run the server!
try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  process.exit(1);
}

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}