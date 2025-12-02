import { z } from "zod";
import { SampleService } from "../../services/sample.service.js";
import { LoggerService } from "../../services/logger.service.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

// 1. Define Schema
export const calculateSumSchema = z.object({
  a: z.number().describe("The first number"),
  b: z.number().describe("The second number"),
});

// 2. Define Configuration
export const calculateSumConfig = {
  name: "calculate_sum",
  description: "Adds two numbers together using the sample service.",
  inputSchema: calculateSumSchema,
};

// 3. Define Handler
export const calculateSumHandler = async (
  params: z.infer<typeof calculateSumSchema>,
  sampleService: SampleService,
  logger: LoggerService
): Promise<CallToolResult> => {
  try {
    logger.info("Calculating sum", {
      operation: "add",
      operands: [params.a, params.b],
    });

    const result = await Promise.resolve(
      sampleService.addNumbers(params.a, params.b)
    );

    return {
      content: [
        {
          type: "text",
          text: `The sum is ${result}`,
        },
      ],
    };
  } catch (error) {
    logger.error("Calculation failed", { error: String(error) });
    return {
      content: [
        {
          type: "text",
          text: `Error: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
};
