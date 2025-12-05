import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { GetPromptResult } from "@modelcontextprotocol/sdk/types.js";
import { IServiceContainer } from "../container.js";
import { summarizePrompt, summarizePromptHandler } from "./sample/summarize.js";

// Define the interface for a prompt definition
export interface PromptDefinition {
  config: {
    name: string;
    description: string;
    inputSchema: z.ZodObject<z.ZodRawShape>;
  };
  handler: (params: Record<string, unknown>) => GetPromptResult;
}

/**
 * Gather all prompts and inject dependencies.
 */
export function allPrompts(container: IServiceContainer): PromptDefinition[] {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { sampleService, loggerService } = container;

  return [
    {
      config: summarizePrompt,
      handler: (params) =>
        summarizePromptHandler(
          params as z.infer<typeof summarizePrompt.inputSchema>
        ),
    },
  ];
}

export function registerPrompts(
  server: McpServer,
  container: IServiceContainer
) {
  function registerPrompt<T extends z.ZodObject<z.ZodRawShape>>(
    config: { name: string; description: string; inputSchema: T },
    handler: (args: z.infer<T>) => GetPromptResult
  ) {
    server.registerPrompt(
      config.name,
      {
        description: config.description,
        argsSchema: config.inputSchema.shape,
      },
      (args: unknown) => handler(args as z.infer<T>)
    );
  }

  // Iterate and register
  allPrompts(container).forEach(({ config, handler }) =>
    registerPrompt(config, handler)
  );
}
