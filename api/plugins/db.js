"use strict";

const fp = require("fastify-plugin");

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope

module.exports = fp(
  async function (fastify, opts) {
    const { PG_USERNAME, PG_PASSWORD, PG_DATABASE } = fastify.env;

    // Connect to Postgres database
    fastify.register(require("@fastify/postgres"), {
      connectionString: `postgres://${PG_USERNAME}:${PG_PASSWORD}@show-tracker-db-1:5432/${PG_DATABASE}`,
    });
  },
  {
    name: "plugin-db",
    dependencies: ["plugin-env"],
  }
);
