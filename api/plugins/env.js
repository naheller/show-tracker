"use strict";

const fp = require("fastify-plugin");

module.exports = fp(
  async function (fastify, opts) {
    const schema = {
      type: "object",
      required: [
        "SEATGEEK_CLIENT_ID",
        "SEATGEEK_SECRET",
        "TICKETMASTER_API_KEY",
        "MAILER_USER",
        "MAILER_PASS",
        "MAILER_FROM",
        "MAILER_TO",
        "PG_USERNAME",
        "PG_PASSWORD",
        "PG_DATABASE",
      ],
      properties: {
        SEATGEEK_CLIENT_ID: {
          type: "string",
          default: "",
        },
        SEATGEEK_SECRET: {
          type: "string",
          default: "",
        },
        TICKETMASTER_API_KEY: {
          type: "string",
          default: "",
        },
        MAILER_USER: {
          type: "string",
          default: "",
        },
        MAILER_PASS: {
          type: "string",
          default: "",
        },
        MAILER_FROM: {
          type: "string",
          default: "",
        },
        MAILER_TO: {
          type: "string",
          default: "",
        },
        PG_USERNAME: {
          type: "string",
          default: "",
        },
        PG_PASSWORD: {
          type: "string",
          default: "",
        },
        PG_DATABASE: {
          type: "string",
          default: "",
        },
      },
    };

    const options = {
      confKey: "env",
      schema: schema,
      dotenv: true,
    };

    fastify.register(require("@fastify/env"), options);
  },
  {
    name: "plugin-env",
  }
);
