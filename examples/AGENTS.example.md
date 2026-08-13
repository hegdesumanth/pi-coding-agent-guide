# Project instructions

This is a sample `AGENTS.md` for a small Python service (FastAPI + Alembic +
pytest). Copy the parts that apply to your own project and drop the rest —
rules the model can't actually check against the repo just add noise.

## Commands

- Run `pytest -q` after any change under `app/`.
- Run `ruff check app/` before considering a change finished.
- Start the dev server with `uvicorn app.main:app --reload` — don't suggest
  a different runner.

## Boundaries

- Migrations live in `alembic/versions/`. Never edit an existing revision
  file; generate a new one with `alembic revision --autogenerate -m "..."`.
- `app/generated/` is produced by `make codegen` and must never be hand-edited.
- Business logic belongs in `app/services/`; route handlers in `app/api/`
  should stay thin — validate input, call a service, return a response.

## Safety

- Ask before running `alembic upgrade` against anything other than the local
  `DATABASE_URL` in `.env`.
- Never commit `.env` or anything under `secrets/`.
- Ask before adding a new third-party dependency to `pyproject.toml`.

## Style

- Type-hint all new function signatures.
- Prefer explicit exceptions over silent `except: pass`.
