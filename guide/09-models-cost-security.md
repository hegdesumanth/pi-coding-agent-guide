# 9. Models, Cost & Security

## Choosing models without config drift

Use `/model` to pick from your installed release's live catalog, and `/scoped-models` to control which subset Ctrl+P cycles through. Both beat hardcoding a model ID in a settings file you'll forget to update the day that model gets deprecated. Thinking effort is a separate axis — cycle it with Shift+Tab, or set a level explicitly with `pi --model sonnet:high "..."`.

Reach for `~/.pi/agent/models.json` only for endpoints the catalog doesn't know about (a local server, an internal proxy) — see the [customization ladder](07-customization-ladder.md#rung-5--a-custom-model-endpoint).

## What the cost display actually tells you

Pi's footer and `/session` show token usage and a dollar estimate. Treat it as a *directional* number for this session, not an invoice:

- The estimate depends on the provider correctly reporting token/cache usage **and** Pi's model metadata having correct rates for that model — either can lag.
- A subscription plan's quota, extra paid usage, and provider credits aren't distinguishable from a token count alone.
- A gateway in front of the provider can charge differently than the number Pi displays.
- A custom `models.json` entry with no cost metadata will show `$0` or a wrong number, not an error.

For anything you'd actually budget against, use the provider's own billing dashboard. Use Pi's number for "is this session unusually expensive," not for accounting.

## Security: Pi has no built-in sandbox

This is worth stating plainly rather than discovering by accident: Pi's built-in tools, and any extension you install, run with the exact permissions of the account that started `pi`. There is no in-process permission boundary — `bash` can run anything your shell can run.

That's a deliberate choice, not an oversight — a partial in-process sandbox would look like a security boundary while still depending on the same host shell, filesystem, and credentials underneath it. Real isolation has to come from outside Pi: a container, a VM, or a policy-controlled sandbox, mounting only the paths and credentials the task actually needs.

Practical takeaway:

- Trusted repo, commands you understand → run locally, review diffs as usual.
- Repo you didn't write, generated code you won't watch closely, or unattended automation → run Pi inside a container/VM instead of on your primary machine.
- Prompt injection from files, comments, or fetched content is an expected risk of any local agent — no config flag removes it. Treat unusual instructions surfacing from *inside* a file the model read as suspicious, the same way you'd treat them in a code review.

Project trust (the "trust this folder?" prompt) is a narrower guard than it sounds — it only decides whether Pi loads project-local settings/extensions/skills automatically. It does not restrict what the model can ask tools to do once you're working in a directory.

Next: [Uninstalling & Troubleshooting →](10-uninstall-and-troubleshooting.md)
