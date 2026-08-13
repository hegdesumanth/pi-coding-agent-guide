# 2. Install & Authenticate

## Prerequisites

Pi ships as an npm package, so you need a recent Node.js:

```bash
node --version
npm --version
```

Check the installed version's requirement with `pi --version` after installing — Pi's Node floor has moved before and will move again.

## Install

```bash
npm install -g --ignore-scripts @earendil-works/pi-coding-agent
```

`--ignore-scripts` skips dependency lifecycle scripts; Pi's normal install doesn't need them. If you installed from an older tutorial and see `@mariozechner/pi-coding-agent` mentioned, that's the package's previous scope — use `@earendil-works` now.

Sanity-check without touching a model:

```bash
pi --version
pi --help
```

## Authenticate

Pi supports two auth paths — pick whichever matches how you already pay for a model:

| Path | How | Where credentials live |
|---|---|---|
| Subscription login | `/login` inside Pi, pick a provider (Claude Pro/Max, ChatGPT Plus/Pro, GitHub Copilot, xAI, OpenRouter, Radius) | `~/.pi/agent/auth.json`, auto-refreshed |
| API key | Export the provider's env var before launching, e.g. `export ANTHROPIC_API_KEY=sk-ant-...`, or run `/login` and choose the API-key option | Environment, or `~/.pi/agent/auth.json` |

Start Pi in a repository you're comfortable letting it inspect, then authenticate from inside:

```bash
cd ~/projects/some-repo
pi
```

```text
/login
```

Follow the provider's flow, then pick a model:

```text
/model
```

Choosing the model live like this — instead of hardcoding a model ID somewhere in a config file — means you're not stuck maintaining a value that goes stale every time a provider ships a new model.

Full provider list, env var names, and cloud-provider setup (Azure OpenAI, Bedrock, Vertex AI, Cloudflare) live in the [providers doc](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/providers.md) — it changes more often than this guide, so treat it as the source of truth.

**Never** put an API key in `AGENTS.md`, a prompt template, a skill, or anything you plan to commit.

Next: [Your First Session →](03-first-session.md)
