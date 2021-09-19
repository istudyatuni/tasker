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
./scripts/setup-db.sh
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

**In development mode**

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

*See also [`server/README.md`](server/README.md)*

## Comparison of TypeScript and Svelte usage in this project

```
$ scc .

───────────────────────────────────────────────────────────────────────────────
Language                 Files     Lines   Blanks  Comments     Code Complexity
───────────────────────────────────────────────────────────────────────────────
TypeScript                  31      1142      148        81      913         83
─────────────────────────
Svelte                      10       410       63         6      341          8
JavaScript                  17       400       58        16      326         23
```

Commit for TypeScript: [`759230c`](https://github.com/istudyatuni/tasker/tree/759230c), for Svelte and JavaScript: [`8628398`](https://github.com/istudyatuni/tasker/tree/8628398)
