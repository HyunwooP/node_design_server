import * as os from "os";
import * as _ from "lodash";

export const healthCheckMemory = () => {
  const totalmem = os.totalmem();
  const freemem = os.freemem();
  const memPercent = (freemem / totalmem) * 100;
  const memoryLimit = 90;

  return memPercent >= memoryLimit;
};
