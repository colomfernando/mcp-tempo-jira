# Development Guide

## Setup

```bash
git clone https://github.com/colomfernando/mcp-tempo-jira.git
cd mcp-tempo-jira
pnpm install
cp .env.example .env
```

Fill in the values in `.env` — see the [environment variables](../README.md#environment-variables) section for how to obtain each one.

## Build and run

```bash
pnpm start
```

This compiles the TypeScript and starts the server. It will wait for MCP input via stdin — that's expected behavior.

## Test with MCP Inspector

Use the [MCP Inspector](https://github.com/modelcontextprotocol/inspector) to test tools interactively without needing an agent:

```bash
npx @modelcontextprotocol/inspector node --env-file=.env dist/index.js
```

Open the Inspector UI in your browser and call tools directly.

## Test with Claude Code

Register the local build as a separate MCP server (using a different name to avoid overwriting your production config):

```bash
claude mcp add --scope user mcp-tempo-jira-local \
  -e TEMPO_API_TOKEN=your_tempo_token \
  -e ACCOUNT_JIRA_ID=your_jira_account_id \
  -- node /absolute/path/to/mcp-tempo-jira/dist/index.js
```

Open a new Claude Code session and try:

- "Show me my worklogs for today"
- "Log 2 hours on issue 12345 for today"
- "Show me all worklogs for project 67890 this week"

> Remember to run `pnpm build` after every code change before testing.
