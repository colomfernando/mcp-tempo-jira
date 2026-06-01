# mcp-tempo-jira

MCP server for [Tempo](https://www.tempo.io/), the Jira time tracking plugin. Lets you manage worklogs directly from any MCP-compatible agent (Claude Desktop, Claude Code, Cursor, etc.).

## Tools

### Worklogs

| Tool                   | Description                                                            |
| ---------------------- | ---------------------------------------------------------------------- |
| `get_user_worklogs`    | Get worklogs for the authenticated user                                |
| `list_worklogs`        | List worklogs with simple filters (date range, issue IDs, project IDs) |
| `search_worklogs`      | Search worklogs with advanced filters including multiple authors       |
| `get_worklog`          | Get a single worklog by ID                                             |
| `create_worklog`       | Create a new worklog for the authenticated user                        |
| `bulk_create_worklogs` | Create multiple worklogs for the same issue at once (max 50)           |
| `update_worklog`       | Update an existing worklog by ID                                       |
| `delete_worklog`       | Delete an existing worklog by ID                                       |

See [docs/worklogs.md](docs/worklogs.md) for detailed parameter reference.

### Work Attributes

| Tool                   | Description                                             |
| ---------------------- | ------------------------------------------------------- |
| `list_work_attributes` | List all work attributes defined in the Tempo workspace |

See [docs/work-attributes.md](docs/work-attributes.md) for detailed parameter reference.

## Configuration

### Environment variables

| Variable          | Required | Description                 | How to obtain                                                                                                                                                                           |
| ----------------- | -------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TEMPO_API_TOKEN` | Yes      | Tempo API integration token | Go to **Tempo → Settings → API Integration** and generate a new token. The token requires **read and write** permissions for the **Worklogs** scope                                     |
| `ACCOUNT_JIRA_ID` | Yes      | Your Jira account ID        | Go to `https://home.atlassian.com`, open your profile — the URL will look like `https://home.atlassian.com/o/<orgId>/people/<accountId>`. Copy the last path segment as your account ID |

### Claude Desktop

Add the following to your `claude_desktop_config.json` (usually at `~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
	"mcpServers": {
		"mcp-tempo-jira": {
			"command": "npx",
			"args": ["-y", "mcp-tempo-jira"],
			"env": {
				"TEMPO_API_TOKEN": "your_tempo_token",
				"ACCOUNT_JIRA_ID": "your_jira_account_id"
			}
		}
	}
}
```

### Claude Code

Both options save to `~/.claude.json` and are available across all your projects.

**Option 1 — Add the server and set environment variables manually:**

```bash
claude mcp add --scope user mcp-tempo-jira -- npx -y mcp-tempo-jira
```

Then open `~/.claude.json` and add the environment variables under the `mcp-tempo-jira` entry:

```json
{
  "mcpServers": {
    "mcp-tempo-jira": {
      "command": "npx",
      "args": ["-y", "mcp-tempo-jira"],
      "env": {
        "TEMPO_API_TOKEN": "your_tempo_token",
        "ACCOUNT_JIRA_ID": "your_jira_account_id"
      }
    }
  }
}
```

**Option 2 — Add the server with environment variables inline:**

```bash
claude mcp add --scope user mcp-tempo-jira -e TEMPO_API_TOKEN=your_tempo_token -e ACCOUNT_JIRA_ID=your_jira_account_id -- npx -y mcp-tempo-jira
```

## Development

See [docs/development.md](docs/development.md) for setup, local testing with MCP Inspector, and how to test with Claude Code.

## References

- [Tempo API documentation](https://apidocs.tempo.io/)
