import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { summarizePrompt, summarizePromptHandler } from "./sample/summarize.js";

export function registerPrompts(server: McpServer) {
  server.prompt(
    summarizePrompt.name,
    summarizePrompt.description,
    summarizePrompt.inputSchema.shape,
    (args) => summarizePromptHandler(args)
  );
}
