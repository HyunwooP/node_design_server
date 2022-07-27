import { getErrorItem } from "@/utils";
import { Application } from "express";
import _ from "lodash";
import {
  CommonStatusCode,
  initializeRouteLevelMiddleWare,
  IRequest,
  IResponse,
} from "..";
import RouteItems, { RouteItem } from "./items";

const createRoute = (app: Application): void => {
  RouteItems.forEach((item: RouteItem) => {
    app[item.method](
      item.path,
      initializeRouteLevelMiddleWare,
      async (request: IRequest, response: IResponse) => {
        try {
          const result = await item.next(request, response);
          console.log(`SUCCESS_${_.toUpper(item.method)}_${item.path}`);
          response.status(result.status ?? CommonStatusCode.OK);
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

export default createRoute;
