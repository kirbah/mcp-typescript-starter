# MCP TypeScript Starter

A production-ready TypeScript template for building Model Context Protocol (MCP) servers. Features dependency injection, Zod validation, and a scalable folder structure.

## Features

- **Minimalist Core**: Pure `stdio` transport, no unnecessary HTTP overhead.
- **Dependency Injection**: Clean architecture using a simple container pattern.
- **Type Safety**: Full TypeScript support with Zod for runtime validation.
- **Quality Tools**: Pre-configured with ESLint, Prettier, and Jest.

## Quick Start

### 1. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/mcp-typescript-starter.git my-mcp-server
cd my-mcp-server
npm install
```

### 2. Build and Run

Build the project:

```bash
npm run build
```

Run the server (stdio mode):

```bash
npm start
```

### 3. Development

Run in watch mode:

```bash
npm run dev
```

Test with the MCP Inspector:

```bash
npm run inspector
```

## How to Use with an MCP Client

To use this server with an MCP client (like Claude Desktop), add the following configuration to your client's config file:

```json
{
  "mcpServers": {
    "my-server": {
      "command": "node",
      "args": ["/absolute/path/to/my-mcp-server/dist/index.js"]
    }
  }
}
```

## Project Structure

- `src/index.ts`: Entry point.
- `src/container.ts`: Dependency injection container.
- `src/services/`: Business logic services.
- `src/tools/`: MCP tool definitions.
  - `sample/calculateSum.ts`: Example tool.
  - `sample/sayHello.ts`: Example tool.
- `src/tools/index.ts`: Tool registry.

## Adding a New Tool

1.  Create a new file in `src/tools/`.
2.  Define the Zod schema, configuration, and handler.
3.  Register the tool in `src/tools/index.ts`.

See `src/tools/sample/sayHello.ts` for a simple example.
