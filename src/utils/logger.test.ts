import { Logger } from "./logger";

describe("Logger", () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it("should log debug messages to stderr", () => {
    Logger.debug("test message");
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining("[DEBUG] test message")
    );
  });

  it("should log info messages to stderr", () => {
    Logger.info("test message");
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining("[INFO] test message")
    );
  });

  it("should log warn messages to stderr", () => {
    Logger.warn("test message");
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining("[WARN] test message")
    );
  });

  it("should log error messages to stderr", () => {
    Logger.error("test message");
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining("[ERROR] test message")
    );
  });

  it("should include timestamp in logs", () => {
    Logger.info("test message");
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringMatching(/\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z\]/)
    );
  });

  it("should format arguments correctly", () => {
    Logger.info("test message", { foo: "bar" }, 123);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('{"foo":"bar"} 123')
    );
  });
});
