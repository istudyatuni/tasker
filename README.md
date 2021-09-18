# Tasker

**How it looks**

<div align="center">
	<img src="docs/images/main-page_screenshot.png" alt="main-page" width="70%">
	<img src="docs/images/edit-page_screenshot.png" alt="edit-page" width="70%">
</div>

## Running

**In docker container**

*I don't know how to link containers without docker-compose, so*

1. Clone the [repo](https://github.com/istudyatuni/tasker)

```bash
git clone -b release https://github.com/istudyatuni/tasker.git
cd tasker
```

*or, without history*

```bash
git clone -b release --single-branch --depth=1 https://github.com/istudyatuni/tasker.git
cd tasker
```

2. Run migrations for the database (only if this is the first run)

```bash
./scripts/setup.sh
```

3. Run app

```bash
docker-compose up -d tasker
```

Then open http://localhost:11697

*If you want to manage your database (e.g. delete tasks), you also need to run adminer:*

```bash
docker-compose up -d tasker adminer
```

The adminer interface will be opened on http://localhost:8080

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

# run migrations in dev db
../scripts/migrate.sh
```

3. Web app

```bash
cd web
yarn install
yarn start
```

Then open http://localhost:8000
