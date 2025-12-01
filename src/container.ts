import "dotenv/config";
import { SampleService } from "./services/sample.service.js";

export interface IServiceContainer {
  sampleService: SampleService;
}

let container: IServiceContainer | null = null;

export function initializeContainer(): IServiceContainer {
  const sampleService = new SampleService();

  container = {
    sampleService,
  };

  return container;
}

export function getContainer(): IServiceContainer {
  if (!container) {
    throw new Error("Container not initialized");
  }
  return container;
}
