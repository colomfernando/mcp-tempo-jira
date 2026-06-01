import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
	INPUT_SCHEMA_USER_WORKLOGS,
	INPUT_SCHEMA_GET_WORKLOG,
	INPUT_SCHEMA_SEARCH_WORKLOGS,
	INPUT_SCHEMA_CREATE_WORKLOG,
	INPUT_SCHEMA_LIST_WORKLOGS,
	INPUT_SCHEMA_BULK_CREATE_WORKLOGS,
	INPUT_SCHEMA_DELETE_WORKLOG,
	INPUT_SCHEMA_UPDATE_WORKLOG
} from './schemas.js';
import TempoClient from '../../tempo-client.js';

export default class WorklogTool {
	private readonly basePath = '/worklogs';
	constructor(
		private server: McpServer,
		private client: TempoClient,
		private accountId: string
	) {}

	register() {
		this.getUserWorklogs();
		this.listWorklogs();
		this.getWorklog();
		this.searchWorklogs();
		this.createWorklog();
		this.bulkCreateWorklogs();
		this.updateWorklog();
		this.deleteWorklog();
	}

	private getUserWorklogs() {
		this.server.registerTool(
			'get_user_worklogs',
			{
				description: 'get worlogs for the authenticated user',
				inputSchema: INPUT_SCHEMA_USER_WORKLOGS
			},
			async ({ from, to }) => {
				const worklogs = await this.client.get(`${this.basePath}/user/${this.accountId}`, { from, to });
				return {
					content: [{ type: 'text', text: JSON.stringify(worklogs) }]
				};
			}
		);
	}

	private listWorklogs() {
		this.server.registerTool(
			'list_worklogs',
			{
				description:
					'Retrieve a list of worklogs using simple GET filters (date range, issue IDs, project IDs). Use this for straightforward queries. For filtering by multiple authors or more complex combinations, use search_worklogs instead.',
				inputSchema: INPUT_SCHEMA_LIST_WORKLOGS
			},
			async ({ projectId, issueId, from, to, updatedFrom, offset, limit, orderBy }) => {
				const worklogs = await this.client.get(this.basePath, {
					projectId,
					issueId,
					from,
					to,
					updatedFrom,
					offset,
					limit,
					orderBy
				});
				return {
					content: [{ type: 'text', text: JSON.stringify(worklogs) }]
				};
			}
		);
	}

	private searchWorklogs() {
		this.server.registerTool(
			'search_worklogs',
			{
				description:
					'Search worklogs using a POST body with advanced filters. Use this when filtering by multiple authors (authorIds) or combining author + date + issue filters. For simple queries without author filtering, use list_worklogs instead.',
				inputSchema: INPUT_SCHEMA_SEARCH_WORKLOGS
			},
			async ({ from, to, authorIds, issueIds, projectIds, updatedFrom, offset, limit }) => {
				const worklogs = await this.client.post(`${this.basePath}/search`, {
					from,
					to,
					authorIds,
					issueIds,
					projectIds,
					updatedFrom,
					offset,
					limit
				});
				return {
					content: [{ type: 'text', text: JSON.stringify(worklogs) }]
				};
			}
		);
	}

	private createWorklog() {
		this.server.registerTool(
			'create_worklog',
			{
				description: 'Create a new worklog for the authenticated user',
				inputSchema: INPUT_SCHEMA_CREATE_WORKLOG
			},
			async ({ issueId, startDate, timeSpentHours, timeSpentMinutes, description, startTime }) => {
				const timeSpentSeconds = (timeSpentHours ?? 0) * 3600 + (timeSpentMinutes ?? 0) * 60;
				const worklog = await this.client.post(this.basePath, {
					authorAccountId: this.accountId,
					issueId,
					startDate,
					timeSpentSeconds,
					description,
					startTime
				});
				return {
					content: [{ type: 'text', text: JSON.stringify(worklog) }]
				};
			}
		);
	}

	private bulkCreateWorklogs() {
		this.server.registerTool(
			'bulk_create_worklogs',
			{
				description:
					'Create multiple worklogs for the same issue at once (max 50). Use this instead of create_worklog when the user wants to log time across multiple days or entries for the same issue.',
				inputSchema: INPUT_SCHEMA_BULK_CREATE_WORKLOGS
			},
			async ({ issueId, worklogs }) => {
				const body = worklogs.map(({ startDate, timeSpentHours, timeSpentMinutes, description, startTime }) => ({
					authorAccountId: this.accountId,
					startDate,
					timeSpentSeconds: (timeSpentHours ?? 0) * 3600 + (timeSpentMinutes ?? 0) * 60,
					description,
					startTime
				}));
				const result = await this.client.post(`${this.basePath}/bulk/${issueId}`, body);
				return {
					content: [{ type: 'text', text: JSON.stringify(result) }]
				};
			}
		);
	}

	private updateWorklog() {
		this.server.registerTool(
			'update_worklog',
			{
				description: 'Update an existing worklog by ID',
				inputSchema: INPUT_SCHEMA_UPDATE_WORKLOG
			},
			async ({ id, issueId, startDate, timeSpentHours, timeSpentMinutes, description, startTime }) => {
				const timeSpentSeconds = (timeSpentHours ?? 0) * 3600 + (timeSpentMinutes ?? 0) * 60;
				const worklog = await this.client.put(`${this.basePath}/${id}`, {
					authorAccountId: this.accountId,
					issueId,
					startDate,
					timeSpentSeconds,
					description,
					startTime
				});
				return {
					content: [{ type: 'text', text: JSON.stringify(worklog) }]
				};
			}
		);
	}

	private deleteWorklog() {
		this.server.registerTool(
			'delete_worklog',
			{
				description: 'Delete an existing worklog by ID',
				inputSchema: INPUT_SCHEMA_DELETE_WORKLOG
			},
			async ({ id, bypassPeriodClosuresAndApprovals }) => {
				await this.client.delete(`${this.basePath}/${id}`, { bypassPeriodClosuresAndApprovals });
				return {
					content: [{ type: 'text', text: `Worklog ${id} deleted successfully` }]
				};
			}
		);
	}

	private getWorklog() {
		this.server.registerTool(
			'get_worklog',
			{
				description: 'get a worklog by id',
				inputSchema: INPUT_SCHEMA_GET_WORKLOG
			},
			async ({ id }) => {
				const worklog = await this.client.get(`${this.basePath}/${id}`);
				return {
					content: [{ type: 'text', text: JSON.stringify(worklog) }]
				};
			}
		);
	}
}
