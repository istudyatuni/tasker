# Tasker

**How it looks**

<div align="center">
	<img src="docs/images/main-page_screenshot.png" alt="main-page" width="70%">
	<img src="docs/images/edit-page_screenshot.png" alt="edit-page" width="70%">
</div>

## Running

**In docker container**

*I don't know how to link containers without docker-compose, so*

You need [`docker-compose.yml`](docker-compose.yml) file, download it, and run

```bash
# if it's first run
./setup.sh

docker-compose up -d tasker
```

Then open http://localhost:11697

*If you want to manage your database (delete tasks, for example), you also need to run adminer:*

```bash
docker-compose up -d tasker adminer
```

Adminer interface will be opened on http://localhost:8080

System - `PostgreSQL`, server - `db`, username and password: `postgres`, database - `tasker_repo`

**Running in development mode**

1. PostgreSQL in docker:

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
