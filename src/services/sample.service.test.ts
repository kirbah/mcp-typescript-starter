import { SampleService } from "./sample.service.js";

describe("SampleService", () => {
  let service: SampleService;

  beforeEach(() => {
    service = new SampleService();
  });

  it("should add two numbers correctly", () => {
    const result = service.addNumbers(2, 3);
    expect(result).toBe(5);
  });

  it("should return system status", async () => {
    const result = await service.getSystemStatus();
    expect(result.status).toBe("operational");
    expect(result.time).toBeInstanceOf(Date);
  });
});
