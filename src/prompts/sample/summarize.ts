import { z } from "zod";
import { GetPromptResult } from "@modelcontextprotocol/sdk/types.js";
import { BasePrompt } from "../base.js";

const SummarizeSchema = z.object({
  style: z
    .string()
    .optional()
    .describe("The style of summary (brief or detailed)"),
});

export class SummarizePrompt extends BasePrompt<typeof SummarizeSchema> {
  name = "summarize_memo";
  description = "Creates a prompt to summarize the system memo";
  schema = SummarizeSchema;

  async get(params: z.infer<typeof SummarizeSchema>): Promise<GetPromptResult> {
    const style = params.style || "brief";

    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Please read the resource at 'memo://system/daily-briefing' and provide a ${style} summary of its contents.`,
          },
        },
      ],
    };
  }
}
