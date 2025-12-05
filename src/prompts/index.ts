import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { IServiceContainer } from "../container.js";
import { BasePrompt } from "./base.js";
import { SummarizePrompt } from "./sample/summarize.js";

const PROMPT_CLASSES = [SummarizePrompt];

// Helper to preserve generic type safety when registering prompts
function registerPromptSafe<T extends z.ZodObject<z.ZodRawShape>>(
  server: McpServer,
  promptInstance: BasePrompt<T>
) {
  server.registerPrompt(
    promptInstance.name,
    promptInstance.getDefinition(),
    (args) => promptInstance.get(args as z.infer<T>)
  );
}

export function registerPrompts(
  server: McpServer,
  container: IServiceContainer
) {
  for (const PromptClass of PROMPT_CLASSES) {
    const promptInstance = new PromptClass(container);
    registerPromptSafe(server, promptInstance);
  }
}
