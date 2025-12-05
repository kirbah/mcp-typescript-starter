import { IServiceContainer } from "../container.js";
import { ReadResourceResult } from "@modelcontextprotocol/sdk/types.js";

export abstract class BaseResource {
  constructor(protected container: IServiceContainer) {}

  abstract uri: string; // The specific URI or a URI pattern
  abstract name: string;
  abstract mimeType: string;
  abstract description?: string;

  /**
   * Execute the resource reading logic.
   * @param uri The actual URI requested (useful if using templates)
   */
  abstract read(uri: URL): Promise<ReadResourceResult>;
}
