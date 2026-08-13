# 5. Commands & Sessions

You don't need to memorize all of this — `/hotkeys` inside Pi is always the current, authoritative list for your installed version. This chapter covers what's worth knowing up front.

## The commands you'll actually reach for

| Command | What it does |
|---|---|
| `/model` | Switch model/provider |
| `/scoped-models` | Choose which models Ctrl+P cycles through |
| `/session` | Show the current session's file, ID, token and cost totals |
| `/tree` | Jump to an earlier point in the session and continue from there |
| `/fork` | Branch a new session off an earlier message |
| `/compact [prompt]` | Summarize older context, optionally with your own instructions for what to keep |
| `/new` | Start a fresh session |
| `/resume` | Browse and reopen a past session |
| `/reload` | Reload context files, extensions, skills, and prompt templates after you edit them |
| `/trust` | Save a trust decision for this project folder |
| `/export [file]` | Write the session out to HTML |
| `/quit` | Exit |

Skills show up as `/skill:name`, and prompt templates expand via `/templatename` — both covered in [The Customization Ladder](07-customization-ladder.md).

## In the editor

| Keys / prefix | Effect |
|---|---|
| `@` | Fuzzy-find and attach a project file |
| `!command` | Run a shell command, send its output to the model |
| `!!command` | Run it, but keep the output out of the model's context |
| Tab | Complete a path |
| Shift+Enter (Ctrl+Enter on Windows Terminal) | Multi-line input |
| Escape | Stop the current agent turn |

## Session flags from the command line

```bash
pi -c                     # Continue your most recent session
pi -r                     # Browse and pick a past session
pi --name "fix-orders"    # Name the session up front
pi --session <path|id>    # Reopen a specific session
pi --fork <path|id>       # Fork an existing session into a new file
pi --no-session           # Ephemeral — don't save anything
```

Sessions land under `~/.pi/agent/sessions/`, grouped by working directory, and save automatically — you don't have to remember to snapshot anything yourself.

## Beyond the interactive TUI

For scripting or CI, skip the terminal UI entirely:

```bash
pi -p "Summarize the open TODOs in this codebase"
cat CHANGELOG.md | pi -p "Turn this into release notes"
pi --mode json   # every event as a JSON line, for programmatic consumption
pi --mode rpc    # stdin/stdout RPC, for embedding Pi in another tool
```

`@` works from the shell too — `pi @src/app.ts @src/app.test.ts "review these together"` attaches both files to the initial message.

Next: [Project Context →](06-project-context.md)
