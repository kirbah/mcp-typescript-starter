import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
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

export function registerTools(server: McpServer, container: IServiceContainer) {
  const { sampleService, loggerService } = container;

  server.tool(
    calculateSumConfig.name,
    calculateSumConfig.description,
    calculateSumConfig.inputSchema.shape,
    (params) =>
      calculateSumHandler(
        params as z.infer<typeof calculateSumSchema>,
        sampleService,
        loggerService
      )
  );

  server.tool(
    sayHelloConfig.name,
    sayHelloConfig.description,
    sayHelloConfig.inputSchema.shape,
    (params) => sayHelloHandler(params as z.infer<typeof sayHelloSchema>)
  );
}
