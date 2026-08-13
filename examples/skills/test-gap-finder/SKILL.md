---
name: test-gap-finder
description: Scans a git diff or a set of changed files for conditional branches, error paths, and edge cases that don't have a matching test. Use when reviewing a PR, before merging a feature branch, or when asked to check test coverage for recent changes.
---

# Test Gap Finder

Finds code paths in a diff that look untested, without editing anything.
Read-only by design — it reports gaps, it doesn't write tests for you.

## Steps

1. Get the scope of the change:
   ```bash
   git diff --stat HEAD~1
   git diff HEAD~1
   ```
   If the user names a different base (a branch, a commit range), use that
   instead of `HEAD~1`.

2. For each changed source file, list every branch introduced or modified:
   - `if`/`else`/`elif` / `switch`/`case` arms
   - early returns and raised/thrown errors
   - loop edge cases (empty input, single item, boundary index)
   - new function parameters with default values (is the non-default path
     covered?)

3. For each branch found, search the corresponding test file(s) for a case
   that would actually exercise it — not just a test that imports the
   function, but one that hits that specific condition.

4. Report as a table: `file:line`, the branch/condition, and `covered` /
   `not covered` / `unclear`. For anything `not covered`, suggest the input
   or setup that would exercise it — one sentence, not a full test file.

## Output format

```
| Location            | Branch/condition                  | Status      |
|----------------------|-----------------------------------|--------------|
| orders.py:42         | order_id not found -> 404         | not covered  |
| orders.py:58         | quantity == 0 -> ValueError        | covered      |
```

Keep the report to what's actually in the diff. Don't expand scope into a
full audit of the file's pre-existing coverage unless asked.
