#!/usr/bin/env node

import "dotenv/config";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { allTools } from "./tools/index.js";
import { initializeContainer } from "./container.js";
import { Logger } from "./utils/logger.js";
import pkg from "../package.json" with { type: "json" };

async function main() {
  // 1. Initialize Services
  const container = initializeContainer();

  // 2. Create MCP Server
  const server = new McpServer({
    name: "mcp-typescript-starter",
    version: pkg.version,
  });

  // 3. Register Tools
  allTools(container).forEach(({ config, handler }) => {
    server.tool(
      config.name,
      config.description,
      config.inputSchema.shape,
      handler
    );
  });

  // 4. Connect Transport (Stdio)
  const transport = new StdioServerTransport();
  await server.connect(transport);

  Logger.info("MCP Server running on stdio");
}

main().catch((error) => {
  Logger.error("Fatal error:", error);
  process.exit(1);
});
