import { sayHelloHandler } from "./sayHello.js";

describe("sayHelloHandler", () => {
  it("should return a greeting", async () => {
    const result = await sayHelloHandler({ name: "World" });
    expect(result.content[0].text).toBe("Hello, World!");
  });
});
