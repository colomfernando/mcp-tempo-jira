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
				description:
					'List all work attributes defined in the Tempo workspace. Use this to discover available attributes (like task type) and their valid values before creating or updating a worklog.',
				inputSchema: INPUT_SCHEMA_LIST_WORK_ATTRIBUTES
			},
			async ({ offset, limit }) => {
				const response = await this.client.get<{
					results: {
						key: string;
						name: string;
						type: string;
						required: boolean;
						names?: Record<string, string>;
					}[];
				}>(this.basePath, { offset, limit });

				const filtered = response.results.map(({ key, name, type, required, names }) => ({
					key,
					name,
					type,
					required,
					...(names && { names })
				}));

				return {
					content: [{ type: 'text', text: JSON.stringify(filtered) }]
				};
			}
		);
	}
}
