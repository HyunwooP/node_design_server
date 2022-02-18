import * as express from "express";
import * as _ from "lodash";
import { CommonStatusCode, initMiddleWare, RequestIE, ResponseIE } from "..";
import { getErrorItems } from "../../lib";
import RouteItems, { RouteItemIE } from "./routes";

export default (app: express.Application): void => {
  RouteItems.forEach((item: RouteItemIE) => {
    app[item.method](
      item.path,
      initMiddleWare,
      async (request: RequestIE, response: ResponseIE) => {
        try {
          const result = await item.next(request, response);
          console.log(`SUCCESS_${_.toUpper(item.method)}_${item.path}`);
          response.status(result.status ?? CommonStatusCode.OK);
          response.send(result);
        } catch (error: unknown) {
          const _error = getErrorItems(error);

          console.log(`ERROR_${_.toUpper(item.method)}_${item.path}`);
          console.log(_error);
          response.status(_error.status);
          response.send(_error);
        }
      }
    );
  });
};
