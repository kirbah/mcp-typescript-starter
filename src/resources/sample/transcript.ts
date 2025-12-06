import { ReadResourceResult } from "@modelcontextprotocol/sdk/types.js";
import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { BaseResource } from "../base.js";

export class TranscriptResource extends BaseResource {
  uri = new ResourceTemplate("youtube://transcript/{videoId}", {
    list: undefined,
  });
  name = "YouTube Transcript";
  mimeType = "application/json";
  description =
    "Get the transcript for a YouTube video. Use URI format: youtube://transcript/{videoId}";

  protected async readImpl(
    uri: URL,
    variables?: unknown
  ): Promise<ReadResourceResult> {
    const { videoId, language_code } = variables as {
      videoId: string;
      language_code?: string;
    };

    if (!videoId) {
      throw new Error("Missing videoId in URI variables");
    }

    // Default to 'en' if language_code is not provided or empty
    const lang = language_code || "en";

    // Trivial sample logic
    const result = {
      videoId,
      language: lang,
      transcript:
        "This is a sample transcript payload for demonstration purposes.",
    };

    return Promise.resolve({
      contents: [
        {
          uri: uri.toString(),
          mimeType: this.mimeType,
          text: JSON.stringify(result, null, 2),
        },
      ],
    });
  }
}

export class TranscriptLocalizedResource extends TranscriptResource {
  override uri = new ResourceTemplate(
    "youtube://transcript/{videoId}/{language_code}",
    {
      list: undefined,
    }
  );
  override name = "YouTube Transcript (Localized)";
  override description =
    "Get the transcript for a YouTube video in a specific language. Use URI format: youtube://transcript/{videoId}/{language_code}";
}
