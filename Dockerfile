FROM elixir:alpine as build-env
WORKDIR /server
COPY ./server/mix* ./
# get hex and dependencies
RUN mix local.hex --force && mix deps.get && mix local.rebar --force
COPY ./server ./
ENV MIX_ENV=prod
RUN mix release

FROM node:alpine AS node_builder
WORKDIR /svelte
COPY ./web/package.json ./web/yarn.lock ./
RUN yarn install
COPY ./web ./
RUN yarn build

FROM alpine:latest
RUN apk add --no-cache ncurses-dev
COPY --from=build-env /server/_build/prod/rel/tasker/ /server/
COPY --from=node_builder /svelte/build /web/dist

CMD ["/server/bin/tasker", "start"]
