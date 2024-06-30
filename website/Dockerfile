FROM node:lts-bookworm-slim as build

WORKDIR /home/node/app
COPY ./package*.json .
RUN npm ci
COPY . .
RUN npm run build

FROM node:lts-bookworm-slim as production

WORKDIR /home/node/app
COPY --from=build /home/node/app/build build/
COPY --from=build /home/node/app/package*.json .

ENV PORT=3001
ENV NODE_ENV=production

EXPOSE 3001
CMD ["node", "build"]