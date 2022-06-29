import config from "@/config";
import { getErrorItem } from "@/utils";
import cors from "cors";
import express, { Request, Response } from "express";
import helmet from "helmet";
import path from "path";
import generateRequest from "./request";
import generateResponse from "./response";
import Sentry from "./sentry";

type ClientRequestItemType = {
  /**
   * Method Type에 상관없이 쉽게 꺼내쓰기 위해 정제한다.
   */
  item: unknown;
};

interface IRequest extends Request, Partial<ClientRequestItemType> {}

interface IResponse extends Response {}

const initializeRouteLevelMiddleWare = async (
  request: IRequest,
  response: IResponse,
  next: Function
): Promise<void> => {
  try {
    await generateRequest(request);
    await generateResponse(response);

    next();
  } catch (error: unknown) {
    const _error = getErrorItem(error);

    response.status(_error.status);
    response.send(_error);
  }
};

const initializeMiddleWare = (app: express.Application): express.Application => {
  if (config.NODE_ENV === "localhost") {
    return initializeLocalHostMiddleWare(app);
  }
  
  return initializeProductionMiddleWare(app);
};

const initializeLocalHostMiddleWare = (app: express.Application): express.Application => {
  return setupDefaultMiddleWare(app);
};

const initializeProductionMiddleWare = (app: express.Application): express.Application => {
  app.use(Sentry.Handlers.requestHandler() as express.RequestHandler);
  app.use(Sentry.Handlers.tracingHandler());
  app.use(Sentry.Handlers.errorHandler() as express.ErrorRequestHandler);
  
  return setupDefaultMiddleWare(app);
};

const setupDefaultMiddleWare = (app: express.Application) => {
  app.use(helmet());
  app.use(
    cors({
      origin: config.origin,
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, "public")));

  return app;
};


export { IRequest, IResponse, initializeMiddleWare, initializeRouteLevelMiddleWare };
