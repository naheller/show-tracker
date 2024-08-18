const fp = require("fastify-plugin");

module.exports = fp(
  async function (fastify, opts) {
    fastify.get("/getBandsByKeyword/:keyword", async function (request, reply) {
      try {
        const { attractions, status } =
          await fastify.ticketmaster.getAttractionsByKeyword(request);
        reply.code(status || 200).send({ attractions });
      } catch (error) {
        reply.code(error.status || 500).send(error);
      }
    });

    fastify.get(
      "/getShowsByBandId/:attractionId",
      async function (request, reply) {
        try {
          const { events, status } =
            await fastify.ticketmaster.getEventsByAttractionId(request);

          reply.code(status || 200).send({ events });
        } catch (error) {
          reply.code(error.status || 500).send(error);
        }
      }
    );

    fastify.post("/addBand", async (request, reply) => {
      const client = await fastify.pg.connect();
      const { name, id: id_tm, url: page_url_tm } = request.body;

      try {
        const { rows } = await client.query(
          `
        insert into bands(id_tm, name, page_url_tm)
        values ($1, $2, $3)
        on conflict (id_tm) do nothing
        returning *;`,
          [id_tm, name, page_url_tm]
        );

        reply.code(rows.length ? 201 : 200).send({ data: request.body });
      } catch (error) {
        reply.code(error.status || 500).send(error);
      } finally {
        client.release();
      }
    });

    fastify.get("/getBands", async (request, reply) => {
      const client = await fastify.pg.connect();

      try {
        const { rows } = await client.query("select * from bands");
        reply.code(200).send({ bands: rows });
      } catch (error) {
        reply.code(error.status || 500).send(error);
      } finally {
        client.release();
      }
    });

    fastify.get("/getShows", async (request, reply) => {
      const client = await fastify.pg.connect();

      try {
        const { rows } = await client.query("select * from shows");
        reply.code(200).send({ shows: rows });
      } catch (error) {
        reply.code(error.status || 500).send(error);
      } finally {
        client.release();
      }
    });

    fastify.patch("/archiveShow/:idTm", async function (request, reply) {
      const client = await fastify.pg.connect();
      const { idTm } = request.params;
      const { archived } = request.body;

      try {
        const { rows } = await client.query(
          `update shows
            set archived=$2
            where id_tm=$1
            returning *;`,
          [idTm, archived]
        );
        reply.code(200).send({ shows: rows });
      } catch (error) {
        reply.code(error.status || 500).send(error);
      } finally {
        client.release();
      }
    });
  },
  {
    name: "routes-website",
    dependencies: ["plugin-db"],
  }
);
