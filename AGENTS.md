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
- **Dependency Injection**: `src/container.ts` manages singleton instances of core services. When you need access to a service within a tool handler, it is injected via `src/tools/index.ts`.
- **Services (`src/services/`)**:
  - `SampleService`: Example service demonstrating business logic.
  - **New Services**: Create new services here for your specific logic.
- **Tools (`src/tools/`)**: Each tool is defined in its own file and has three parts: a Zod schema for input validation, a configuration object (`...Config`), and a handler function (`...Handler`).
- **Tool Registration**: `src/tools/index.ts` is the central registry. All new tools must be added to the `allTools` array here to be exposed by the server.

## Common Tasks

### How to Add a New Tool

1.  **Create the Tool File**: Add a new `.ts` file in the appropriate subdirectory of `src/tools/` (e.g., `src/tools/sample/newTool.ts`).
2.  **Define Input Schema**: In the new file, define a `zod` schema for the tool's input parameters.
3.  **Define Tool Configuration**: Export a `...Config` object containing the tool's `name`, `description`, and `inputSchema`.
4.  **Implement the Handler**: Export an async `...Handler` function that accepts `params` and any required services. Implement the tool's logic and return the result.
5.  **Register the Tool**: In `src/tools/index.ts`, import the new `config` and `handler`, and add them to the `toolDefinitions` array, injecting the necessary services.

### How to Modify an Existing Tool

1.  **Locate the Tool File**: Find the tool's definition in the `src/tools/` directory.
2.  **Update Schema (if needed)**: If changing the tool's inputs, update the Zod schema in the tool's file.
3.  **Modify Handler Logic**: Update the `...Handler` function with the new logic.
4.  **Update Tests**: Locate the relevant test file and add or update tests to cover your changes.

### How to Add a New Resource

1.  **Create the Resource File**: Add a new `.ts` file in `src/resources/` (e.g., `src/resources/sample/newResource.ts`).
2.  **Define Resource Logic**: Export a function that handles the resource read request.
3.  **Register the Resource**: In `src/resources/index.ts`, import your handler and register it using `server.resource(...)`.

### How to Add a New Prompt

1.  **Create the Prompt File**: Add a new `.ts` file in `src/prompts/` (e.g., `src/prompts/sample/newPrompt.ts`).
2.  **Define Prompt Logic**: Export a function that handles the get prompt request.
3.  **Register the Prompt**: In `src/prompts/index.ts`, import your handler and register it using `server.prompt(...)`.

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
