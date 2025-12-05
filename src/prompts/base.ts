import { z } from "zod";
import { IServiceContainer } from "../container.js";
import { GetPromptResult } from "@modelcontextprotocol/sdk/types.js";

export abstract class BasePrompt<T extends z.ZodType> {
    constructor(protected container: IServiceContainer) { }

    abstract name: string;
    abstract description: string;
    abstract schema: T;

    abstract get(params: z.infer<T>): Promise<GetPromptResult>;

    public getDefinition() {
        return {
            name: this.name,
            description: this.description,
            arguments: this.schema, // Note: SDK uses 'arguments' or 'argsSchema' depending on version
        };
    }
}
