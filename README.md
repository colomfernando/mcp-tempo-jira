# mcp-tempo-jira

MCP server for [Tempo](https://www.tempo.io/), the Jira time tracking plugin. Lets you manage worklogs directly from any MCP-compatible agent (Claude Desktop, Claude Code, Cursor, etc.).

## Tools

| Tool | Description |
|------|-------------|
| `get_user_worklogs` | Get worklogs for the authenticated user, optionally filtered by date range |
| `list_worklogs` | List worklogs with simple filters (date range, issue IDs, project IDs) |
| `search_worklogs` | Search worklogs with advanced filters including multiple authors |
| `get_worklog` | Get a single worklog by ID |
| `create_worklog` | Create a new worklog for the authenticated user |
| `bulk_create_worklogs` | Create multiple worklogs for the same issue at once (max 50) |
| `update_worklog` | Update an existing worklog by ID |
| `delete_worklog` | Delete an existing worklog by ID |

## Configuration

### Prerequisites

Build the project before configuring:

```bash
pnpm install
pnpm build
```

### Environment variables

| Variable | Required | Description | How to obtain |
|----------|----------|-------------|---------------|
| `TEMPO_API_TOKEN` | Yes | Tempo API integration token | Go to **Tempo → Settings → API Integration** and generate a new token. The token requires **read and write** permissions for the **Worklogs** scope |
| `ACCOUNT_JIRA_ID` | Yes | Your Jira account ID | Go to `https://home.atlassian.com`, open your profile — the URL will look like `https://home.atlassian.com/o/<orgId>/people/<accountId>`. Copy the last path segment as your account ID |

### Claude Desktop

Add the following to your `claude_desktop_config.json` (usually at `~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "mcp-tempo-jira": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-tempo-jira/dist/index.js"],
      "env": {
        "TEMPO_API_TOKEN": "your_tempo_token",
        "ACCOUNT_JIRA_ID": "your_jira_account_id"
      }
    }
  }
}
```

### Claude Code

Run the following command in your terminal:

```bash
claude mcp add mcp-tempo-jira node /absolute/path/to/mcp-tempo-jira/dist/index.js \
  -e TEMPO_API_TOKEN=your_tempo_token \
  -e ACCOUNT_JIRA_ID=your_jira_account_id
```
