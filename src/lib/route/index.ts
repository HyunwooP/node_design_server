import { getErrorItem } from "@/utils";
import { Application } from "express";
import _ from "lodash";
import { initMiddleWare, IRequest, IResponse } from "..";
import RouteItems, { RouteItemType } from "./routes";

export default (app: Application): void => {
  RouteItems.forEach((item: RouteItemType) => {
    app[item.method](
      item.path,
      initMiddleWare,
      async (request: IRequest, response: IResponse) => {
        try {
          const result = await item.next(request, response);
          console.log(`SUCCESS_${_.toUpper(item.method)}_${item.path}`);
          response.send({
            item: result,
          });
        } catch (error: unknown) {
          const _error = getErrorItem(error);

          console.log(`ERROR_${_.toUpper(item.method)}_${item.path}`);
          console.log(_error);
          response.status(_error.status);
          response.send(_error);
        }
      }
    );
  });
};
