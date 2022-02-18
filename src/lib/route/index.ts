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
      async (req: RequestIE, res: ResponseIE) => {
        try {
          const result = await item.next(req, res);
          console.log(`SUCCESS_${_.toUpper(item.method)}_${item.path}`);
          res.status(result.status ?? CommonStatusCode.OK);
          res.send(result);
        } catch (error: unknown) {
          const _error = getErrorItems(error);

          console.log(`ERROR_${_.toUpper(item.method)}_${item.path}`);
          console.log(_error);
          res.status(_error.status ?? CommonStatusCode.BAD_REQUEST);
          res.send(_error);
        }
      }
    );
  });
};
