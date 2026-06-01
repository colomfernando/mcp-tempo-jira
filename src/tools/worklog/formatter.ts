import type { WorklogResult } from './schemas.js';

// Strips verbose Tempo API fields (self URLs, billing, audit) to reduce token usage
export const formatWorklog = (w: WorklogResult) => ({
	id: w.tempoWorklogId,
	issueId: w.issue.id,
	timeSpentSeconds: w.timeSpentSeconds,
	startDate: w.startDate,
	startTime: w.startTime,
	description: w.description,
	attributes: w.attributes?.values
});
