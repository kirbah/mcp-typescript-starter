import { z } from "zod";
import { IServiceContainer } from "../container.js";
import { GetPromptResult } from "@modelcontextprotocol/sdk/types.js";

export abstract class BasePrompt<
  T extends z.ZodObject<z.ZodRawShape> = z.ZodObject<z.ZodRawShape>,
> {
  constructor(protected container: IServiceContainer) {}

  abstract name: string;
  abstract description: string;
  abstract schema: T;

  abstract get(params: z.infer<T>): Promise<GetPromptResult>;

  public getDefinition() {
    return {
      description: this.description,
      argsSchema: this.schema.shape,
    };
  }
}
