# Worklog Tools

## `get_user_worklogs`

Get worklogs for the authenticated user.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `from` | string | No | Start date in `yyyy-MM-dd` format |
| `to` | string | No | End date in `yyyy-MM-dd` format |

---

## `list_worklogs`

Retrieve a list of worklogs with simple GET filters. Use for straightforward queries. For filtering by multiple authors, use `search_worklogs` instead.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `from` | string | No | Start date in `yyyy-MM-dd` format |
| `to` | string | No | End date in `yyyy-MM-dd` format |
| `issueId` | number[] | No | Filter by issue IDs |
| `projectId` | number[] | No | Filter by project IDs |
| `updatedFrom` | string | No | Filter by last updated date (`yyyy-MM-dd` or `yyyy-MM-ddTHH:mm:ssZ`) |
| `orderBy` | string | No | Sort descending by field — `ID`, `START_DATE_TIME`, or `UPDATED` |
| `offset` | number | No | Pagination offset (default: 0) |
| `limit` | number | No | Max results to return (default: 50) |

---

## `search_worklogs`

Search worklogs with advanced POST filters. Use when filtering by multiple authors or combining author + date + issue filters. For simple queries, use `list_worklogs` instead.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `from` | string | No | Start date in `yyyy-MM-dd` format |
| `to` | string | No | End date in `yyyy-MM-dd` format |
| `authorIds` | string[] | No | Filter by author account IDs |
| `issueIds` | number[] | No | Filter by issue IDs |
| `projectIds` | number[] | No | Filter by project IDs |
| `updatedFrom` | string | No | Filter by last updated date (`yyyy-MM-dd` or `yyyy-MM-ddTHH:mm:ssZ`) |
| `offset` | number | No | Pagination offset (default: 0) |
| `limit` | number | No | Max results to return (default: 50) |

---

## `get_worklog`

Get a single worklog by ID.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Worklog ID |

---

## `create_worklog`

Create a new worklog for the authenticated user.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `issueId` | number | Yes | Jira issue ID to log time against |
| `startDate` | string | Yes | Start date in `yyyy-MM-dd` format |
| `timeSpentHours` | number | No | Hours spent |
| `timeSpentMinutes` | number | No | Minutes spent |
| `description` | string | No | Worklog description |
| `startTime` | string | No | Start time in `HH:mm:ss` format |

---

## `bulk_create_worklogs`

Create multiple worklogs for the same issue at once (max 50). Use instead of `create_worklog` when logging time across multiple days or entries for the same issue.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `issueId` | number | Yes | Jira issue ID applied to all worklogs |
| `worklogs` | array | Yes | List of worklogs to create (max 50) |

Each item in `worklogs`:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `startDate` | string | Yes | Start date in `yyyy-MM-dd` format |
| `timeSpentHours` | number | No | Hours spent |
| `timeSpentMinutes` | number | No | Minutes spent |
| `description` | string | No | Worklog description |
| `startTime` | string | No | Start time in `HH:mm:ss` format |

---

## `update_worklog`

Update an existing worklog by ID.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Worklog ID to update |
| `issueId` | number | Yes | Jira issue ID |
| `startDate` | string | Yes | Start date in `yyyy-MM-dd` format |
| `timeSpentHours` | number | No | Hours spent |
| `timeSpentMinutes` | number | No | Minutes spent |
| `description` | string | No | Worklog description |
| `startTime` | string | No | Start time in `HH:mm:ss` format |

---

## `delete_worklog`

Delete an existing worklog by ID.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Worklog ID to delete |
| `bypassPeriodClosuresAndApprovals` | boolean | No | Bypass period closures and approvals — requires Tempo Administrator permission (default: false) |
