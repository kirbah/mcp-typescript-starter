import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { IServiceContainer } from "../container.js";
import { SystemMemoResource } from "./sample/systemMemo.js";

const RESOURCE_CLASSES = [SystemMemoResource];

export function registerResources(
  server: McpServer,
  container: IServiceContainer
) {
  for (const ResourceClass of RESOURCE_CLASSES) {
    const resourceInstance = new ResourceClass(container);

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
