import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { ReadResourceResult } from "@modelcontextprotocol/sdk/types.js";
import { IServiceContainer } from "../container.js";

import { systemMemoHandler, systemMemoResource } from "./sample/systemMemo.js";

export interface ResourceDefinition {
  config: {
    name: string;
    uri: string;
    mimeType: string;
    description?: string;
  };
  handler: (uri: URL) => ReadResourceResult | Promise<ReadResourceResult>;
}

export function allResources(
  container: IServiceContainer
): ResourceDefinition[] {
  // No dependencies needed for now
  // const { sampleService, loggerService } = container;

  return [
    {
      config: {
        name: systemMemoResource.name,
        uri: systemMemoResource.uri,
        mimeType: systemMemoResource.mimeType,
        description: systemMemoResource.description,
      },
      handler: (_uri) => systemMemoHandler(container),
    },
  ];
}

export function registerResources(
  server: McpServer,
  container: IServiceContainer
) {
  function registerResource(
    config: {
      name: string;
      uri: string;
      mimeType: string;
      description?: string;
    },
    handler: (uri: URL) => ReadResourceResult | Promise<ReadResourceResult>
  ) {
    server.registerResource(
      config.name,
      config.uri,
      {
        mimeType: config.mimeType,
        description: config.description,
      },
      async (uri) => handler(uri)
    );
  }

  allResources(container).forEach(({ config, handler }) =>
    registerResource(config, handler)
  );
}
