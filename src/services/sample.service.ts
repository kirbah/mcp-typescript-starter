export class SampleService {
  /**
   * A simple math operation to demonstrate service logic.
   */
  public addNumbers(a: number, b: number): number {
    return a + b;
  }

  /**
   * Simulates an async operation (e.g., database or API call).
   */
  public async getSystemStatus(): Promise<{ status: string; time: Date }> {
    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 100));
    return {
      status: "operational",
      time: new Date(),
    };
  }
}
