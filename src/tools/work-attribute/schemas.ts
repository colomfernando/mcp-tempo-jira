import { z } from 'zod';

export const INPUT_SCHEMA_LIST_WORK_ATTRIBUTES = z.object({
	offset: z.number().optional().describe('Pagination offset (default: 0)'),
	limit: z.number().optional().describe('Max results to return (default: 50)')
});
