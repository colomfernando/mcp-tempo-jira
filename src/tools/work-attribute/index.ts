import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { INPUT_SCHEMA_LIST_WORK_ATTRIBUTES } from './schemas.js';
import TempoClient from '../../tempo-client.js';

export default class WorkAttributeTool {
	private readonly basePath = '/work-attributes';

	constructor(
		private server: McpServer,
		private client: TempoClient
	) {}

	register() {
		this.listWorkAttributes();
	}

	private listWorkAttributes() {
		this.server.registerTool(
			'list_work_attributes',
			{
				description: 'List all work attributes defined in the Tempo workspace. Use this to discover available attributes (like task type) and their valid values before creating or updating a worklog.',
				inputSchema: INPUT_SCHEMA_LIST_WORK_ATTRIBUTES
			},
			async ({ offset, limit }) => {
				const attributes = await this.client.get(this.basePath, { offset, limit });
				return {
					content: [{ type: 'text', text: JSON.stringify(attributes) }]
				};
			}
		);
	}
}
