import { z } from "zod";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

// 1. Define Schema
export const sayHelloSchema = z.object({
  name: z.string().describe("The name to greet"),
});

// 2. Define Configuration
export const sayHelloConfig = {
  name: "say_hello",
  description: "Returns a greeting message.",
  inputSchema: sayHelloSchema,
};

// 3. Define Handler
export const sayHelloHandler = async (
  params: z.infer<typeof sayHelloSchema>
): Promise<CallToolResult> => {
  return await Promise.resolve({
    content: [
      {
        type: "text",
        text: `Hello, ${params.name}!`,
      },
    ],
  });
};
