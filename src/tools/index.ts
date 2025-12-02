import { z } from "zod";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { IServiceContainer } from "../container.js";
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

export interface ToolDefinition {
  config: {
    name: string;
    description: string;
    inputSchema: z.AnyZodObject;
  };
  handler: (params: unknown) => Promise<CallToolResult>;
}

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
