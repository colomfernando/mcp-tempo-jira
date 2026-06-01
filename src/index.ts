#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import TempoClient from './tempo-client.js';
import WorklogTool from './tools/worklog/index.js';

const server = new McpServer({
	name: 'mcp-tempo',
	version: '1.0.0'
});

const main = async () => {
	const token = process.env.TEMPO_API_TOKEN;

	if (!token) {
		console.error('TEMPO_API_TOKEN environment variable is not set');
		process.exit(1);
	}

	const accountId = process.env.ACCOUNT_JIRA_ID;
	if (!accountId) {
		console.error('ACCOUNT_JIRA_ID environment variable is not set');
		process.exit(1);
	}

	const tempoClient = new TempoClient(token);
	new WorklogTool(server, tempoClient, accountId).register();

	const transport = new StdioServerTransport();
	await server.connect(transport);
};

main();
