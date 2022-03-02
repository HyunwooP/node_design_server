import env from "@/config";
import { Application } from "express";
import * as http from "http";

export const createServer = (server: Application): void => {
  http
    .createServer(server)
    .listen(env.port, () => console.log(`App Listen Port ${env.port}`));
};
