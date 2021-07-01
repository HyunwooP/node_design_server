import { onFailureHandler } from "./function";
import { CommonStatusCode, CommonStatusMessage } from "./status";
import {
  AppRepository,
  connectMongo,
  connectRepository,
  generateTestData,
} from "./database/mongo";
import { createServer } from "./server";
import { createExpress } from "./express";
import { initMiddleWare, RequestIE, ResponseIE } from "./middleware";
import createRoute from "./route";

export {
  // server
  createExpress,
  createServer,
  createRoute,
  // common function
  onFailureHandler,
  // common status
  CommonStatusCode,
  CommonStatusMessage,
  // database
  connectMongo,
  AppRepository,
  connectRepository,
  generateTestData, // example
  // middleware
  initMiddleWare,
  RequestIE,
  ResponseIE,
};
