# Tasker server

## Work with db

- `mix ecto.gen.migration` - generates a migration that the user can fill in with particular commands
- `mix ecto.migrate` - migrates a repository
- `mix ecto.migrations` - shows all migrations and their status
- `mix ecto.rollback` - rolls back a particular migration

Links

- [`mix ecto.gen.migration`](https://hexdocs.pm/ecto_sql/Mix.Tasks.Ecto.Gen.Migration.html)
- [`mix ecto.migrate`](https://hexdocs.pm/ecto_sql/Mix.Tasks.Ecto.Migrate.html)
- [`mix ecto.migrations`](https://hexdocs.pm/ecto_sql/Mix.Tasks.Ecto.Migrations.html)
- [`mix ecto.rollback`](https://hexdocs.pm/ecto_sql/Mix.Tasks.Ecto.Rollback.html)

## Generate documentation

```bash
mix docs
```

See at https://istudyatuni.github.io/tasker
