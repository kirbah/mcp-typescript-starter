import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

// RFC 5424 Log Levels
export type LogLevel =
  | "debug"
  | "info"
  | "notice"
  | "warning"
  | "error"
  | "critical"
  | "alert"
  | "emergency";

const LOG_LEVEL_ORDER: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  notice: 2,
  warning: 3,
  error: 4,
  critical: 5,
  alert: 6,
  emergency: 7,
};

export class LoggerService {
  private server: McpServer | null = null;
  private currentLevel: number = LOG_LEVEL_ORDER.info; // Default to info

  /**
   * We attach the server instance after initialization to avoid circular dependencies
   */
  public init(server: McpServer) {
    this.server = server;
  }

  public setLevel(level: LogLevel) {
    const newLevel = LOG_LEVEL_ORDER[level];
    if (newLevel !== undefined) {
      this.currentLevel = newLevel;
      // We can locally log the change, but don't send a notification about the level change itself
      // as that creates noise.
      console.error(`[Local Log] Log level changed to ${level}`);
    }
  }

  public getLevel(): LogLevel {
    // Reverse lookup for string representation
    return (
      (Object.keys(LOG_LEVEL_ORDER).find(
        (key) => LOG_LEVEL_ORDER[key as LogLevel] === this.currentLevel
      ) as LogLevel) || "info"
    );
  }

  private shouldLog(level: LogLevel): boolean {
    return LOG_LEVEL_ORDER[level] >= this.currentLevel;
  }

  /**
   * Sends a structured log notification to the client.
   * Also prints to stderr for local debugging/safety.
   */
  private async sendLog(
    level: LogLevel,
    message: string,
    data?: Record<string, unknown>,
    loggerName: string = "mcp-server"
  ) {
    // CHECK LEVEL FIRST
    if (!this.shouldLog(level)) return;

    // Send MCP Protocol Notification
    if (this.server) {
      try {
        await this.server.server.notification({
          method: "notifications/message",
          params: {
            level,
            logger: loggerName,
            data: {
              message,
              ...this.sanitizeData(data), // Handle Error objects
            },
          },
        });
      } catch (error) {
        // Fallback if transport fails
        console.error("Failed to send log notification:", error);
      }
    }
  }

  // Helper to ensure Errors serialize correctly
  private sanitizeData(
    data?: Record<string, unknown>
  ): Record<string, unknown> | undefined {
    if (!data) return undefined;

    // Create a shallow copy to modify
    const cleanData: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(data)) {
      if (value instanceof Error) {
        // Explicitly extract Error properties
        cleanData[key] = {
          ...value, // spreads any custom properties on the error
          name: value.name,
          message: value.message,
          stack: value.stack,
        };
      } else {
        cleanData[key] = value;
      }
    }
    return cleanData;
  }

  // --- Convenience Methods ---

  public debug(
    message: string,
    data?: Record<string, unknown>,
    logger?: string
  ) {
    void this.sendLog("debug", message, data, logger);
  }

  public info(
    message: string,
    data?: Record<string, unknown>,
    logger?: string
  ) {
    void this.sendLog("info", message, data, logger);
  }

  public warning(
    message: string,
    data?: Record<string, unknown>,
    logger?: string
  ) {
    void this.sendLog("warning", message, data, logger);
  }

  public error(
    message: string,
    data?: Record<string, unknown>,
    logger?: string
  ) {
    void this.sendLog("error", message, data, logger);
  }

  public critical(
    message: string,
    data?: Record<string, unknown>,
    logger?: string
  ) {
    void this.sendLog("critical", message, data, logger);
  }
}
