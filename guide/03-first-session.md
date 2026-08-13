# 3. Your First Session

Resist the urge to hand Pi a real feature on the first run. Start with two small, low-stakes requests that tell you whether it actually understands the project.

## Step 1 — a read-only probe

Say you're pointing Pi at a small Flask API repo. Ask it to explain itself before it touches anything:

```text
Look at this repository and tell me: what does the service do, where do
requests enter (routes/controllers), and what command runs the test suite?
Don't edit anything — just report back.
```

Then check the answer against the code yourself. A confident-sounding answer built on the wrong route file or a guessed test command is worse than no answer — you'll only catch it by looking.

## Step 2 — one bounded edit

Once the probe checks out, give it something small and scoped:

```text
Add a test covering the case where /orders/<id> is requested for an order
that doesn't exist. Run only that test file. Show me the diff and flag
anything you're unsure about.
```

## The shape of every task after this

1. Start from a clean working tree — `git status` should show nothing pending.
2. Give Pi one task, scoped narrowly enough that you can review the result in a few minutes.
3. Let it read before it writes.
4. Read the diff yourself — don't skim it.
5. Run the check that actually matters (a test, a lint, a manual smoke test).
6. Commit only once you understand what changed and why.

## A standing warning worth internalizing now

Pi's `bash` tool runs with your user account's permissions — anything your shell can do, an agent-issued command can do too. That's not a Pi bug, it's how a local coding agent has to work. If you're pointing it at a repository or a command you don't fully trust, run it inside a container or VM rather than directly on your machine (more in [Models, Cost & Security](09-models-cost-security.md)).

Next: [The Core Workflow →](04-core-workflow.md)
