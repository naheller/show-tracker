const fp = require("fastify-plugin");

module.exports = fp(
  async function (fastify, opts) {
    fastify.get("/addNewShows", async function (request, reply) {
      const client = await fastify.pg.connect();

      try {
        const { rows } = await client.query("SELECT id, id_tm from bands;");
        const attraction = rows.map((row) => ({
          id: row.id,
          idTm: row.id_tm,
        }));

        const getEventsPromises = attraction.map(
          async ({ id: bandId, idTm }, index) => {
            const delayMultiplier = index;
            return fastify.ticketmaster.getEventsByAttractionId(
              {
                params: { attractionId: idTm },
              },
              delayMultiplier,
              bandId
            );
          }
        );

        const fetchResults = await Promise.all(getEventsPromises);
        const eventsToAdd = fetchResults.map(({ events }) => events).flat();

        const addEventsPromises = eventsToAdd.map((event) => {
          const venue = event._embedded.venues[0];
          return client.query(
            `
          insert into shows(name, id_tm, band_id, datetime_utc, page_url_tm, venue_name, venue_lat_lon)
          values ($1, $2, $3, $4, $5, $6, $7)
          on conflict (id_tm) do nothing
          returning *;`,
            [
              event.name,
              event.id,
              event.bandId,
              event.dates.start.dateTime,
              event.url,
              venue.name,
              [venue.location.latitude, venue.location.longitude].join(),
            ]
          );
        });

        const insertResults = await Promise.all(addEventsPromises);
        const newShows = insertResults.map(({ rows }) => rows).flat();

        if (newShows.length) {
          fastify.mailer.sendAlert(newShows);
        }

        reply.code(200).send({ newShows });
      } catch (error) {
        reply.code(error.status || 500).send(error);
      } finally {
        client.release();
      }
    });
    fastify.get("/archivePastShows", async function (request, reply) {
      const client = await fastify.pg.connect();

      try {
        const { rows } = await client.query(
          `update shows
            set archived=true
            where archived=false
            and datetime_utc < cast(current_timestamp as text)
            returning *;`
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
    name: "routes-cron",
    dependencies: ["plugin-db"],
  }
);
