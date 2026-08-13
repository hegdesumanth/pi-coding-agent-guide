# 10. Uninstalling & Troubleshooting

## Resetting cleanly

Drop a saved credential without removing anything else:

```text
/logout
```

Remove the CLI with whichever package manager installed it:

```bash
npm uninstall -g @earendil-works/pi-coding-agent
# pnpm remove -g / yarn global remove / bun uninstall, matching your install path
```

Uninstalling the CLI does **not** touch `~/.pi/agent/` — settings, saved credentials, session history, and installed packages stay put. If you want those gone too, remove that directory yourself, but look through `.pi/` project folders first: they can hold project-specific settings someone deliberately configured, not just cache.

## Troubleshooting checklist (things that trip up a first run)

These aren't in the upstream docs as a single list — collected here because they're the snags that actually cost time on a fresh setup:

- **"command not found" right after install** — your global npm bin directory usually isn't on `PATH` by default. Run `npm config get prefix` and make sure `<prefix>/bin` (or `<prefix>` on Windows) is on `PATH`.
- **Pi starts but every provider call fails** — check `/login` actually completed; a half-finished OAuth flow can leave a stale, unexpired-looking token in `~/.pi/agent/auth.json`. `/logout` then `/login` again.
- **On Windows: Pi complains it can't find a shell** — Pi requires an actual `bash.exe` (Git Bash, Cygwin, MSYS2, or WSL), checked in that order after any custom path in settings. Installing [Git for Windows](https://git-scm.com/download/win) covers this for most setups. If you've got multiple bash installs, pin the one you want explicitly:

  ```json
  { "shellPath": "C:\\Program Files\\Git\\bin\\bash.exe" }
  ```

- **A skill or extension you just added isn't showing up** — you probably need `/reload`, or a restart if you changed something loaded before the project-trust decision (extensions handling `project_trust` itself, for instance).
- **Context file edits aren't taking effect** — same fix: `/reload`, or restart. Pi doesn't watch `AGENTS.md`/`CLAUDE.md` for live changes.
- **New project, Pi asks to "trust" the folder** — that's expected the first time a directory has `.pi/settings.json`, `.pi/extensions|skills|prompts|themes`, or a system-prompt override file. Declining just skips those resources for this run; it's not a sandbox decision, see [security notes](09-models-cost-security.md#security-pi-has-no-built-in-sandbox).

## A quick "should I actually reach for Pi" checklist

Original to this guide, distilled from the overview:

- [ ] You're comfortable configuring your own provider, context files, and (eventually) extensions, rather than getting them pre-wired.
- [ ] You want the same core tool available across very different projects without re-learning a bespoke permission model each time.
- [ ] You don't need MCP, sub-agents, or a permission-prompt system on day one — and you're fine adding those later as packages if a real need shows up.
- [ ] You're able to run it inside a container/VM for anything you wouldn't want running with your full local permissions.

If most of those don't hold — for example, you want a fully managed setup with sandboxing and integrations already decided for you — a more opinionated harness will cost you less setup time than making Pi's building blocks fit that shape yourself.
