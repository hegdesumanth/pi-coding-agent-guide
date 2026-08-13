# 8. Skills & Extensions in Practice

## Skills — a repeatable method, not a tool

A skill is a directory with a `SKILL.md` (frontmatter + instructions) plus anything else it needs — scripts, reference docs, templates. Pi loads skills from `~/.pi/agent/skills/`, project `.pi/skills/` (once the project is trusted), packages, or `--skill <path>` on the command line, and shows them in the system prompt so the model can pull one in when the `description` matches what you asked for. You can also invoke one explicitly with `/skill:name`.

The `description` is the whole trigger mechanism — a vague one ("helps with tests") never gets picked up; a specific one ("scans a diff for code paths without a matching test, use when reviewing a PR or before merging") does.

### Try the example: `test-gap-finder`

[`examples/skills/test-gap-finder/SKILL.md`](../examples/skills/test-gap-finder/SKILL.md) is a small original skill: given a diff, it lists branches and edge cases that look untested, without touching any files itself. Try it without installing anything globally:

```bash
cd /path/to/your/project
pi --skill /path/to/pi-coding-agent-guide/examples/skills/test-gap-finder
```

Then either let Pi pick it up naturally when you ask about test coverage, or invoke it directly:

```text
/skill:test-gap-finder
```

Skills are instructions, not a sandbox — a skill with a malicious set of steps can still talk the model into running something harmful through Pi's normal tools. Read a skill's `SKILL.md` before pointing Pi at one you didn't write.

## Extensions — new behavior, full permissions

Extensions are TypeScript modules that register commands, tools, or event handlers. They run with the same OS-level permissions as the Pi process itself — there's no extra sandboxing for extension code.

The hook that matters most for safety work is `tool_call`: it fires after a tool call is proposed but before it executes, can inspect or rewrite `event.input`, and can block the call outright by returning `{ block: true, reason }`.

### Try the example: `confirm-force-push`

[`examples/extensions/confirm-force-push.ts`](../examples/extensions/confirm-force-push.ts) is a small original extension: it watches `bash` calls for a force-push shape (`git push ... --force` / `-f`) and asks for explicit confirmation before letting one through. In non-interactive mode (no UI to confirm with), it blocks by default rather than guessing.

```bash
cd /path/to/your/project
pi --extension /path/to/pi-coding-agent-guide/examples/extensions/confirm-force-push.ts
```

Push normally and nothing changes; try a force-push and you'll get a prompt first.

This is a teaching example, not a complete guard — it matches on command text, so a sufficiently unusual way of writing the same push (an alias, a wrapper script, `git config push.force`) can slip past a regex. Read any extension before installing it globally; it's ordinary code with your login.

Next: [Models, Cost & Security →](09-models-cost-security.md)
