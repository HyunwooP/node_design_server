import * as express from "express";
import * as _ from "lodash";
import { CommonStatusCode, initMiddleWare, RequestIE, ResponseIE } from "..";
import { onFailureHandler } from "../../lib/function";
import { CommonStatusMessage } from "../../lib/status";
import RouteItems, { RouteItemIE } from "./routes";

export default (app: express.Application): void => {
  RouteItems.forEach((item: RouteItemIE) => {
    app[item.method](
      item.path,
      initMiddleWare,
      async (req: RequestIE, res: ResponseIE) => {
        try {
          const result = await item.next(req, res);
          console.log(`SUCCESS_${_.toUpper(item.method)}_${item.path}`);
          res.status(result.status ?? CommonStatusCode.OK);
          res.send(result);
        } catch (e) {
          console.log(`ERROR_${_.toUpper(item.method)}_${item.path}`);
          console.log(e);
          res.status(e.status ?? CommonStatusCode.BAD_REQUEST);
          res.send(e);
        }
      }
    );
  });
};
