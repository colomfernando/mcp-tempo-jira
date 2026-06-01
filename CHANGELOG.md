# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-06-01

### Added

- `get_user_worklogs` tool — get worklogs for the authenticated user filtered by date range
- `list_worklogs` tool — list worklogs with simple GET filters
- `search_worklogs` tool — search worklogs with advanced POST filters including multiple authors
- `get_worklog` tool — get a single worklog by ID
- `create_worklog` tool — create a new worklog with hours/minutes conversion
- `bulk_create_worklogs` tool — create multiple worklogs for the same issue at once (max 50)
- `update_worklog` tool — update an existing worklog by ID
- `delete_worklog` tool — delete an existing worklog by ID
- `list_work_attributes` tool — list all work attributes defined in the Tempo workspace
