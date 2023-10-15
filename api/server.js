// Import the framework and instantiate it
import Fastify from "fastify";
import cros from "@fastify/cors";
import { Multiply, Divide } from "./work.js";

const fastify = Fastify({
  logger: true,
});

fastify.register(cros, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
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
fastify.listen({ port: 3000, host: "0.0.0.0" });
