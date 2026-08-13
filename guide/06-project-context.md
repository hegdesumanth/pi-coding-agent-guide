# 6. Project Context

## What Pi loads, and from where

At startup, Pi walks from the current directory up through its parents looking for `AGENTS.md` or `CLAUDE.md`, plus `~/.pi/agent/AGENTS.md` for anything global. If a directory has an `AGENTS.override.md`, that replaces (not adds to) the `AGENTS.md`/`CLAUDE.md` Pi would otherwise load from that specific directory — other directories in the chain still layer normally.

Changes to these files need a restart or `/reload` to take effect — Pi doesn't watch them live.

## What actually belongs in one

Concrete, checkable facts the model would otherwise have to guess or discover the hard way:

- what the project does and where the real boundaries are
- the exact commands for install, test, lint, build
- naming/style conventions specific to this codebase
- paths that are generated or must never be hand-edited
- project-specific safety rules ("ask before touching migrations")

### A worked example

For a Python service using pytest and Alembic migrations:

```markdown
# Project instructions

- Run `pytest -q` after any change under `app/`.
- Migrations live in `alembic/versions/` — never hand-edit an existing one;
  generate a new revision with `alembic revision --autogenerate`.
- Business logic belongs in `app/services/`, not in route handlers.
- `app/generated/` is produced by `make codegen` — don't edit it directly.
- Ask before running anything that touches the `alembic upgrade` command
  against a non-local database URL.
```

Compare that with something that reads well but tells the model nothing it can act on:

```markdown
Write clean, well-tested, idiomatic Python.
```

The first version gives Pi commands it can actually run and boundaries it can actually check against. The second is a vibe — nothing in it is verifiable, so nothing in it changes behavior.

A ready-to-adapt starting point lives at [`examples/AGENTS.example.md`](../examples/AGENTS.example.md).

## Two more files worth knowing about

- `.pi/SYSTEM.md` — replaces the default system prompt outright. A bigger commitment: you're now responsible for anything the default prompt used to cover.
- `.pi/APPEND_SYSTEM.md` (or `~/.pi/agent/APPEND_SYSTEM.md` globally) — adds a small number of rules *on top of* the default prompt, without taking over the whole thing. This is the one to reach for first.

Only rules you can actually enforce belong in either file — an instruction the model can't verify against the repo is just noise.

Next: [The Customization Ladder →](07-customization-ladder.md)
