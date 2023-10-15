// Import the framework and instantiate it
import Fastify from "fastify";
import { Multiply, Divide } from "./work.js";

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
  const { a, b, special } = request.query;
  reply.send(Multiply(a, b, special));
  isWorking = false;
});

// Divide get values from query string
fastify.get("/divide", async (request, reply) => {
  if (isWorking) {
    reply.send({ error: "Server is busy" });
    return;
  }
  isWorking = true;
  const { a, b, special } = request.query;
  reply.send(Divide(a, b, special));
  isWorking = false;
});

// Run the server!
try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  process.exit(1);
}
