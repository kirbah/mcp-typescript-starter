import { z } from "zod";
import { BaseTool } from "../base.js";

const schema = z.object({
  name: z.string().describe("The name of the person to greet"),
});

export class SayHelloTool extends BaseTool<typeof schema> {
  name = "say_hello";
  description = "Greets a user by name.";
  schema = schema;

  protected async executeImpl(params: z.infer<typeof schema>) {
    return Promise.resolve({
      content: [
        {
          type: "text" as const,
          text: `Hello, ${params.name}!`,
        },
      ],
    });
  }
}
