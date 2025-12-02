import { z } from "zod";

// 1. Definition
export const summarizePrompt = {
  name: "summarize_memo",
  description: "Creates a prompt to summarize the system memo",
  inputSchema: z.object({
    style: z
      .string()
      .optional()
      .describe("The style of summary (brief or detailed)"),
  }),
};

// 2. Handler
export const summarizePromptHandler = (args: { style?: string }) => {
  const style = args.style || "brief";

  return {
    messages: [
      {
        role: "user" as const,
        content: {
          type: "text" as const,
          text: `Please read the resource at 'memo://system/daily-briefing' and provide a ${style} summary of its contents.`,
        },
      },
    ],
  };
};
