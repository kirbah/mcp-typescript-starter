import { IServiceContainer } from "../../container.js";

// 1. Definition
export const systemMemoResource = {
  uri: "memo://system/daily-briefing", // Custom URI scheme
  name: "System Daily Briefing",
  description: "A dynamic memo from the system",
  mimeType: "text/plain",
};

// 2. Handler
export const systemMemoHandler = (container: IServiceContainer) => {
  const { sampleService } = container;
  const memo = sampleService.getSystemMemo();

  return {
    contents: [
      {
        uri: systemMemoResource.uri,
        mimeType: systemMemoResource.mimeType,
        text: memo,
      },
    ],
  };
};
