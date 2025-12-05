import { ReadResourceResult } from "@modelcontextprotocol/sdk/types.js";
import { BaseResource } from "../base.js";

export class SystemMemoResource extends BaseResource {
  uri = "memo://system/daily-briefing";
  name = "System Daily Briefing";
  mimeType = "text/plain";
  description = "A dynamic memo from the system";

  async read(uri: URL): Promise<ReadResourceResult> {
    const { sampleService } = this.container;
    const memo = sampleService.getSystemMemo();

    return {
      contents: [
        {
          uri: this.uri,
          mimeType: this.mimeType,
          text: memo,
        },
      ],
    };
  }
}
