import { z } from "zod";
import { BaseTool } from "../base.js";

const schema = z.object({
  a: z.number().describe("The first number"),
  b: z.number().describe("The second number"),
});

export class CalculateSumTool extends BaseTool<typeof schema> {
  name = "calculate_sum";
  description = "Adds two numbers together using the sample service.";
  schema = schema;

  protected executeImpl(params: z.infer<typeof schema>) {
    // Access services directly via this.container
    const { sampleService, loggerService } = this.container;

    loggerService.info("Calculating sum", { a: params.a, b: params.b });

    const result = sampleService.addNumbers(params.a, params.b);

    return Promise.resolve({
      content: [
        {
          type: "text" as const,
          text: `The sum is ${result}`,
        },
      ],
    });
  }
}
