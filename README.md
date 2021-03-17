# Tasker

**Running**

1. Postgres in docker:

```bash
docker-compose up
```

2. Elixir server:

```bash
cd server
# dependencies
mix deps.get
iex -S mix
```

3. Web app

```bash
cd web
yarn install
yarn start
```

Then open http://localhost:3000
