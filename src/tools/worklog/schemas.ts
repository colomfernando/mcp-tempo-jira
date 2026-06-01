import { z } from 'zod';

export const INPUT_SCHEMA_USER_WORKLOGS = z.object({
	from: z.string().describe('start date in YYYY-MM-DD format'),
	to: z.string().describe('end date in YYYY-MM-DD format')
});

export const INPUT_SCHEMA_GET_WORKLOG = z.object({
	id: z.string().describe('worklog ID')
});

export const INPUT_SCHEMA_DELETE_WORKLOG = z.object({
	id: z.string().describe('Worklog ID to delete'),
	bypassPeriodClosuresAndApprovals: z
		.boolean()
		.optional()
		.describe('Bypass period closures and approvals (requires Tempo Administrator permission)')
});

export const INPUT_SCHEMA_LIST_WORKLOGS = z.object({
	projectId: z.array(z.number()).optional().describe('Filter by project IDs'),
	issueId: z.array(z.number()).optional().describe('Filter by issue IDs'),
	from: z.string().optional().describe('Start date (yyyy-MM-dd)'),
	to: z.string().optional().describe('End date (yyyy-MM-dd)'),
	updatedFrom: z.string().optional().describe('Filter by last updated date (yyyy-MM-dd or yyyy-MM-ddTHH:mm:ssZ)'),
	offset: z.number().optional().describe('Pagination offset (default: 0)'),
	limit: z.number().optional().describe('Max results to return (default: 50)'),
	orderBy: z.enum(['ID', 'START_DATE_TIME', 'UPDATED']).optional().describe('Sort results descending by this field')
});

export const INPUT_SCHEMA_CREATE_WORKLOG = z.object({
	issueId: z.number().describe('Jira issue ID to log time against'),
	startDate: z.string().describe('Start date (yyyy-MM-dd)'),
	timeSpentHours: z.number().optional().describe('Hours spent'),
	timeSpentMinutes: z.number().optional().describe('Minutes spent'),
	description: z.string().optional().describe('Worklog description'),
	startTime: z.string().optional().describe('Start time (HH:mm:ss)')
});

export const INPUT_SCHEMA_UPDATE_WORKLOG = z
	.object({ id: z.string().describe('Worklog ID to update') })
	.merge(INPUT_SCHEMA_CREATE_WORKLOG);

export const INPUT_SCHEMA_BULK_CREATE_WORKLOGS = z.object({
	issueId: z.number().describe('Jira issue ID (applied to all worklogs)'),
	worklogs: z
		.array(INPUT_SCHEMA_CREATE_WORKLOG.omit({ issueId: true }))
		.min(1)
		.max(50)
		.describe('List of worklogs to create (max 50)')
});

export const INPUT_SCHEMA_SEARCH_WORKLOGS = z.object({
	from: z.string().optional().describe('Start date (yyyy-MM-dd)'),
	to: z.string().optional().describe('End date (yyyy-MM-dd)'),
	authorIds: z.array(z.string()).optional().describe('Filter by author account IDs'),
	issueIds: z.array(z.number()).optional().describe('Filter by Jira issue IDs'),
	projectIds: z.array(z.number()).optional().describe('Filter by project IDs'),
	updatedFrom: z.string().optional().describe('Filter by last updated date (yyyy-MM-dd or yyyy-MM-ddTHH:mm:ssZ)'),
	offset: z.number().optional().describe('Pagination offset (default: 0)'),
	limit: z.number().optional().describe('Max results to return (default: 50)')
});
