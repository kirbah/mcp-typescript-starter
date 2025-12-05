import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { IServiceContainer } from "../container.js";
import { SummarizePrompt } from "./sample/summarize.js";

const PROMPT_CLASSES = [SummarizePrompt];

export function registerPrompts(
  server: McpServer,
  container: IServiceContainer
) {
  for (const PromptClass of PROMPT_CLASSES) {
    const promptInstance = new PromptClass(container);
    const definition = promptInstance.getDefinition();

    server.registerPrompt(
      definition.name,
      {
        description: definition.description,
        argsSchema: (definition.arguments as any).shape,
      },
      (args: any) => promptInstance.get(args)
    );
  }
}
