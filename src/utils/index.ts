import config from "@/config";
import { ConfigType } from "@/lib/type";
import * as _ from "lodash";
import { ObjectID } from "mongodb";
import * as os from "os";

export const nowMemoryPercent = (): number => {
  const totalmem = os.totalmem();
  const freemem = os.freemem();
  const memPercent = (freemem / totalmem) * 100;

  return memPercent;
};

export const healthCheckMemory = (): boolean => {
  const memoryLimit = 90;
  return nowMemoryPercent() >= memoryLimit;
};

/**
 * toObjectId
 * @description
 * hash로 이루어진 objectId로 찾아야하나, find로 통해 나온 objectId는 string으로 변환되어있음.
 * @param {string | ObjectID} value
 * @returns
 */
export const toObjectId = (_id: string | ObjectID | undefined): ObjectID => {
  if (_.isUndefined(_id)) {
    throw new Error("toObjectId Failed - id is Undefined");
  }

  return typeof _id === "string" ? new ObjectID(_id) : _id;
};

export const generateConfigLog = (): void => {
  console.log("==================================");
  console.log("*");
  console.log("*");
  console.log("*");
  console.log("*");
  console.log("*");
  console.log(
    `* start time: ${new Date().toLocaleDateString(config.timezone, {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    })}`
  );
  Object.keys(config).forEach((key) => {
    console.log(`* ${key}: ${config[key as keyof ConfigType]}`);
  });
  console.log("*");
  console.log("*");
  console.log("*");
  console.log("*");
  console.log("*");
  console.log("==================================");
};
