import { z } from "zod";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { IServiceContainer } from "../container.js";

export abstract class BaseTool<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends z.ZodType<any, any, any> = z.ZodType<any, any, any>,
> {
  // Dependencies are injected automatically via constructor
  constructor(protected container: IServiceContainer) {}

  // Abstract properties that every tool must define
  abstract name: string;
  abstract description: string;
  abstract schema: T;

  // The actual logic implementation
  protected abstract executeImpl(params: z.infer<T>): Promise<CallToolResult>;

  // Public entry point that handles error catching and logging
  public async execute(params: unknown): Promise<CallToolResult> {
    try {
      // 1. Validate Input (Runtime check)
      const validatedParams = await this.schema.parseAsync(params);

      // 2. Run Logic
      return await this.executeImpl(validatedParams);
    } catch (err) {
      // 3. Centralized Error Handling
      const errorMessage = err instanceof Error ? err.message : String(err);
      this.container.loggerService.error(
        `Tool execution failed: ${this.name}`,
        { error: errorMessage }
      );

      return {
        content: [{ type: "text", text: `Error: ${errorMessage}` }],
        isError: true,
      };
    }
  }

  // Helper to format the tool for the MCP SDK registration
  public getDefinition() {
    return {
      description: this.description,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      inputSchema: this.schema as unknown as z.ZodObject<any>,
    };
  }
}
