import "dotenv/config";
import { SampleService } from "./services/sample.service.js";
import { LoggerService } from "./services/logger.service.js";

export interface IServiceContainer {
  sampleService: SampleService;
  loggerService: LoggerService;
}

let container: IServiceContainer | null = null;

export function initializeContainer(): IServiceContainer {
  const loggerService = new LoggerService();
  const sampleService = new SampleService();

  container = {
    sampleService,
    loggerService,
  };

  return container;
}

export function getContainer(): IServiceContainer {
  if (!container) {
    throw new Error("Container not initialized");
  }
  return container;
}
