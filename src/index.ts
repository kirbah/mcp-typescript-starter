#!/usr/bin/env node

import "dotenv/config";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { allTools } from "./tools/index.js";
import { initializeContainer } from "./container.js";
import pkg from "../package.json" with { type: "json" };
import { LogLevel } from "./services/logger.service.js";
import { registerResources } from "./resources/index.js";
import { registerPrompts } from "./prompts/index.js";

async function main() {
  // 1. Initialize Services
  const container = initializeContainer();
  const { loggerService } = container;

  // 2. Create MCP Server
  const server = new McpServer(
    {
      name: "mcp-typescript-starter",
      version: pkg.version,
    },
    {
      capabilities: {
        logging: {},
        resources: {},
        prompts: {},
      },
    }
  );

  // 3. Wire up the Logger Service
  loggerService.init(server);

  // 4. Register protocol handler for setting log level
  server.server.setRequestHandler(
    z.object({
      method: z.literal("logging/setLevel"),
      params: z.object({
        level: z.enum([
          "debug",
          "info",
          "notice",
          "warning",
          "error",
          "critical",
          "alert",
          "emergency",
        ] as [LogLevel, ...LogLevel[]]),
      }),
    }),
    (request) => {
      loggerService.setLevel(request.params.level);
      return Promise.resolve({});
    }
  );

  // 5. Register Tools
  allTools(container).forEach(({ config, handler }) => {
    server.tool(
      config.name,
      config.description,
      config.inputSchema.shape,
      handler
    );
  });

  // 6. Register Resources
  registerResources(server, container);

  // 7. Register Prompts
  registerPrompts(server);

  // 6. Connect Transport (Stdio)
  const transport = new StdioServerTransport();
  await server.connect(transport);

  loggerService.info(`MCP Server started. Version ${pkg.version}`);
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
