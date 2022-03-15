import config from "@/config";
import * as cors from "cors";
import * as express from "express";
import helmet from "helmet";
import * as path from "path";

const corsConfig = {
  origin: config.origin,
  credentials: true,
};

export const createExpress = (): express.Application => {
  const app: express.Application = express();

  app.use(helmet());
  app.use(cors(corsConfig));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, "public")));

  return app;
};
