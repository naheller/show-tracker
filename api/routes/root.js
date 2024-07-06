"use strict";

const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, opts) {
  fastify.get("/health", async function (request, reply) {
    return { hello: "world" };
  });

  fastify.get("/test-db", async function (request, reply) {
    const client = await fastify.pg.connect();
    try {
      const { rows } = await client.query("SELECT * from SHOWS");
      // Note: avoid doing expensive computation here, this will block releasing the client
      return rows;
    } catch (error) {
    } finally {
      // Release the client immediately after query resolves, or upon error
      client.release();
    }
  });

  fastify.get("/debug-sentry", async function (request, reply) {
    throw new Error("My first Sentry error!");
  });
});
