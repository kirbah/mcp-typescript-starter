import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { IServiceContainer } from "../container.js";
import { CalculateSumTool } from "./sample/calculateSum.js";
import { SayHelloTool } from "./sample/sayHello.js";

// 1. Maintain a list of Constructors
const TOOL_CLASSES = [CalculateSumTool, SayHelloTool];

export function registerTools(server: McpServer, container: IServiceContainer) {
  for (const ToolClass of TOOL_CLASSES) {
    // Instantiate with DI container
    const toolInstance = new ToolClass(container);

    // Register with MCP Server
    server.registerTool(
      toolInstance.name,
      toolInstance.getDefinition(),
      // Bind execution to the instance
      (args) => toolInstance.execute(args)
    );
  }
}
