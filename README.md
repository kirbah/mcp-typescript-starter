# MCP TypeScript Starter

A production-ready TypeScript template for building Model Context Protocol (MCP) servers.

## Features

- **Class-Based Architecture**: scalable patterns for Tools, Resources, and Prompts.
- **Dependency Injection**: Clean access to services (Logger, Config, etc.) via a unified container.
- **Type Safety**: Automatic Zod validation for inputs.
- **Quality Tools**: Pre-configured with ESLint, Prettier, and Jest.

## Quick Start

### 1. Installation

```bash
git clone https://github.com/kirbah/mcp-typescript-starter.git my-mcp-server
cd my-mcp-server
npm install
```

### 2. Build and Run

```bash
npm run build
npm start
```

### 3. Development

```bash
# Watch mode for auto-reloading
npm run dev

# Debug using the MCP Inspector
npm run inspector
```

## Configuration (Claude Desktop)

To use this server with Claude Desktop, add this to your `claude_desktop_config.json`:

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

## Architecture

This project uses a **Class-based pattern** to ensure consistency and type safety.

- **`src/container.ts`**: Singletons (Logger, Services) are instantiated here.
- **`src/tools/base.ts`**: The base class that handles error catching and input validation.
- **`src/tools/index.ts`**: The registry file where tools are loaded.

## How to Add a New Tool

1.  **Create a file** in `src/tools/` (e.g., `myTool.ts`).
2.  **Extend `BaseTool`** and define your Zod schema:

```typescript
import { z } from "zod";
import { BaseTool } from "../base.js";

const InputSchema = z.object({
  name: z.string(),
});

export class MyTool extends BaseTool<typeof InputSchema> {
  name = "my_tool";
  description = "Example description";
  schema = InputSchema;

  protected async executeImpl(params: z.infer<typeof InputSchema>) {
    // Access services via this.container
    this.container.loggerService.info("Tool ran!");

    return {
      content: [{ type: "text", text: `Hello ${params.name}` }],
    };
  }
}
```

3.  **Register it** in `src/tools/index.ts`:

```typescript
// ... imports
const TOOL_CLASSES = [
  CalculateSumTool,
  SayHelloTool,
  MyTool, // <-- Add here
];
```

_The same pattern applies to **Resources** (`extends BaseResource`) and **Prompts** (`extends BasePrompt`)._

## Key Commands

| Command          | Description                     |
| ---------------- | ------------------------------- |
| `npm run build`  | Compiles TypeScript to `/dist`. |
| `npm run dev`    | Runs in watch mode.             |
| `npm run test`   | Runs Jest tests.                |
| `npm run format` | Formats code with Prettier.     |
| `npm run lint`   | Checks for code issues.         |

```

```
