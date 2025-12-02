import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { IServiceContainer } from "../container.js";

import { systemMemoHandler, systemMemoResource } from "./sample/systemMemo.js";

export function registerResources(
  server: McpServer,
  container: IServiceContainer
) {
  server.resource(
    systemMemoResource.name,
    systemMemoResource.uri,
    { mimeType: systemMemoResource.mimeType },
    (_uri) => systemMemoHandler(container)
  );
}
