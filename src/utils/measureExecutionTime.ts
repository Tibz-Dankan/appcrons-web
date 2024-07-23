import { performance } from "perf_hooks";

export const measureExecutionTime = (func: any) => {
  const startTime = performance.now();
  func();
  const endTime = performance.now();

  const timeTaken = endTime - startTime;

  return timeTaken;
};
