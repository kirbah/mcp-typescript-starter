import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { IServiceContainer } from "../container.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import {
  calculateSumConfig,
  calculateSumHandler,
  calculateSumSchema,
} from "./sample/calculateSum.js";
import {
  sayHelloConfig,
  sayHelloHandler,
  sayHelloSchema,
} from "./sample/sayHello.js";

// Define the interface for a tool definition
export interface ToolDefinition {
  config: {
    name: string;
    description: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    inputSchema: z.ZodObject<any>;
  };
  handler: (params: Record<string, unknown>) => Promise<CallToolResult>;
}

/**
 * Gather all tools and inject dependencies.
 */
export function allTools(container: IServiceContainer): ToolDefinition[] {
  const { sampleService, loggerService } = container;

  return [
    {
      config: calculateSumConfig,
      handler: (params) =>
        calculateSumHandler(
          params as z.infer<typeof calculateSumSchema>,
          sampleService,
          loggerService
        ),
    },
    {
      config: sayHelloConfig,
      handler: (params) =>
        sayHelloHandler(params as z.infer<typeof sayHelloSchema>),
    },
  ];
}

/**
 * Registers all tools with the MCP server.
 */
export function registerTools(server: McpServer, container: IServiceContainer) {
  // --- Centralized helper to register tools with annotations ---
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function registerTool<T extends z.ZodObject<any>>(
    config: { name: string; description: string; inputSchema: T },
    handler: (args: z.infer<T>) => Promise<CallToolResult>
  ) {
    const humanReadableTitle = config.name
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());

    server.registerTool(
      config.name,
      {
        description: config.description,
        inputSchema: config.inputSchema,
        annotations: {
          title: humanReadableTitle,
          readOnlyHint: true, // Assuming tools are safe by default or we can make this configurable
          idempotentHint: true,
        },
      },
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      (async (args: z.infer<T>): Promise<CallToolResult> => {
        try {
          return await handler(args);
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : String(err);
          return {
            content: [{ type: "text", text: `Error: ${errorMessage}` }],
            isError: true,
          };
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }) as any
    );
  }

  // Iterate and register
  allTools(container).forEach(({ config, handler }) =>
    registerTool(config, handler)
  );
}
