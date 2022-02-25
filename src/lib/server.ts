import env from "@/config";
import * as express from "express";
import * as http from "http";

export const createServer = (server: express.Application): void => {
  http
    .createServer(server)
    .listen(env.port, () => console.log(`App Listen Port ${env.port}`));
};
