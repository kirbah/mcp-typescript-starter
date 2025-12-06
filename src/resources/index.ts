import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { IServiceContainer } from "../container.js";
import { SystemMemoResource } from "./sample/systemMemo.js";
import {
  TranscriptResource,
  TranscriptLocalizedResource,
} from "./sample/transcript.js";

const RESOURCE_CLASSES = [
  SystemMemoResource,
  TranscriptResource,
  TranscriptLocalizedResource,
];

export function registerResources(
  server: McpServer,
  container: IServiceContainer
) {
  for (const ResourceClass of RESOURCE_CLASSES) {
    const resourceInstance = new ResourceClass(container);

    if (resourceInstance.uri instanceof ResourceTemplate) {
      server.registerResource(
        resourceInstance.name,
        resourceInstance.uri,
        {
          mimeType: resourceInstance.mimeType,
          description: resourceInstance.description,
        },
        (uri, variables) => resourceInstance.read(uri, variables)
      );
    } else {
      server.registerResource(
        resourceInstance.name,
        resourceInstance.uri,
        {
          mimeType: resourceInstance.mimeType,
          description: resourceInstance.description,
        },
        (uri) => resourceInstance.read(uri)
      );
    }
  }
}
