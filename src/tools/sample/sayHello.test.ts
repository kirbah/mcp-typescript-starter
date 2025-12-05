import { SayHelloTool } from "./sayHello.js";
import { IServiceContainer } from "../../container.js";

describe("SayHelloTool", () => {
  const mockContainer = {
    loggerService: {
      error: jest.fn(),
      info: jest.fn(),
    },
    sampleService: {},
  } as unknown as IServiceContainer;

  it("should return a greeting", async () => {
    const tool = new SayHelloTool(mockContainer);
    const result = await tool.execute({ name: "World" });

    expect(result.content[0].type).toBe("text");
    if (result.content[0].type === "text") {
      expect(result.content[0].text).toBe("Hello, World!");
    }
    expect(result.isError).toBeUndefined();
  });
});
