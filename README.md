# Tasker

## Running

**In docker container**

*I don't know how to link containers without docker-compose*

You need `docker-compose.yml` file, download it, and run

```bash
docker-compose up -d tasker
```

Then open http://localhost

*If you want to manage your database (delete tasks, for example), run*

```bash
docker-compose up -d tasker adminer
```

Adminer interface will be opened on http://localhost:8080

Username and password: `postgres`

**Manually, build from source**

1. PostgresSQL in docker:

```bash
docker-compose up adminer
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
