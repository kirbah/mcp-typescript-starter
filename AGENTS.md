# AGENTS.md

This file provides instructions for AI coding agents on how to work with this project.

## Project Philosophy

1.  **Token Efficiency is Paramount:** Every tool and data structure is designed to be "lean" and "token-optimized." When modifying code, prioritize returning only the most essential data to minimize the token footprint for the client LLM. Avoid verbose responses.
2.  **LLM-Centric Design:** Data should be structured for easy consumption by AI models. This means clear, predictable JSON structures and concise field names.
3.  **Robustness and Reliability:** All new code should include strong input validation (using Zod schemas) and clear, consistent error handling.

## Key Commands

| Command             | Description                                                                 |
| ------------------- | --------------------------------------------------------------------------- |
| `npm install`       | Installs all project dependencies. Run this first.                          |
| `npm run lint`      | Checks the code for linting errors according to ESLint rules.               |
| `npm run format`    | Automatically formats all code using Prettier.                              |
| `npm run test`      | Executes the entire Jest test suite. All tests must pass before committing. |
| `npm run build`     | Compiles the TypeScript project into JavaScript in the `/dist` directory.   |
| `npm run inspector` | Runs the MCP server with a local inspector for debugging tools.             |

## Project Architecture

- **Entry Point**: `src/index.ts` initializes the environment, the service container, and the MCP server. It registers all tools.
- **Dependency Injection**: `src/container.ts` manages singleton instances of core services. When you need access to a service within a tool handler, it is injected via the `BaseTool` class.
- **Services (`src/services/`)**:
  - `SampleService`: Example service demonstrating business logic.
  - **New Services**: Create new services here for your specific logic.
- **Tools (`src/tools/`)**: Each tool is a class extending `BaseTool`. It encapsulates the schema, business logic, and dependency access.
- **Tool Registration**: `src/tools/index.ts` is the central registry. All new tool classes must be added to the `TOOL_CLASSES` array here.

## Common Tasks

### How to Add a New Tool

1.  **Create the Tool File**: Add a new `.ts` file in the appropriate subdirectory of `src/tools/` (e.g., `src/tools/sample/newTool.ts`).
2.  **Create the Class**: Export a class extending `BaseTool<typeof schema>`. Implement the `name`, `description`, `schema` properties and the `executeImpl` method.
3.  **Implement Logic**: Access services via `this.container` (e.g., `this.container.loggerService`).
4.  **Register the Tool**: Import your class in `src/tools/index.ts` and add it to the `TOOL_CLASSES` array.

### How to Modify an Existing Tool

1.  **Locate the Tool File**: Find the tool's definition in the `src/tools/` directory.
2.  **Update Schema (if needed)**: If changing the tool's inputs, update the Zod schema in the tool's file.
3.  **Modify Handler Logic**: Update the `executeImpl` method with the new logic.
4.  **Update Tests**: Locate the relevant test file and add or update tests to cover your changes.

### How to Add a New Resource

1.  **Create the Resource File**: Add a new `.ts` file in the appropriate subdirectory of `src/resources/` (e.g., `src/resources/sample/newResource.ts`).
2.  **Create the Class**: Export a class extending `BaseResource`. Implement the `uri`, `name`, `mimeType`, `description` properties and the `read` method.
3.  **Implement Logic**: Access services via `this.container`.
4.  **Register the Resource**: Import your class in `src/resources/index.ts` and add it to the `RESOURCE_CLASSES` array.

### How to Add a New Prompt

1.  **Create the Prompt File**: Add a new `.ts` file in the appropriate subdirectory of `src/prompts/` (e.g., `src/prompts/sample/newPrompt.ts`).
2.  **Create the Class**: Export a class extending `BasePrompt<typeof schema>`. Implement the `name`, `description`, `schema` properties and the `get` method.
3.  **Implement Logic**: Access services via `this.container`.
4.  **Register the Prompt**: Import your class in `src/prompts/index.ts` and add it to the `PROMPT_CLASSES` array.

## Testing Instructions

- Run all tests with `npm run test`.
- To run tests for a single file (which is faster during development), use: `npm run test -- <path_to_test_file>`.
- Tests are written with Jest. Mocks for external services are heavily used.
- Always add or update tests to reflect your code changes.

## Quality Assurance

Before submitting any changes, you **MUST** run the following commands to ensure code quality:

1.  `npm run lint`: Fix any linting errors.
2.  `npm run format:check`: Ensure code is formatted correctly.
3.  `npm run test`: Ensure all tests pass.
