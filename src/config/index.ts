import { NodeEnvironment } from "@/lib";
import "dotenv/config";
import { MongoConnectionOptions } from "typeorm/driver/mongodb/MongoConnectionOptions";

type MongoCustomConfig = Pick<
  MongoConnectionOptions,
  "port" | "host" | "username" | "database" | "password" | "type"
>;

export type Config = {
  NODE_ENV: NodeEnvironment;
  sentryDSN: string;
  port: string | number;
  mongo: MongoCustomConfig;
  origin: string;
};

// * Because variables are injected even in the Docker environment, || is used because it is an empty string rather than undefined.
const config: Config = {
  NODE_ENV: (process.env.NODE_ENV as NodeEnvironment) || "localhost",
  sentryDSN: process.env.sentryDSN || "",
  port: process.env.port || 3005,
  mongo: {
    type: "mongodb",
    port: process.env.mongoPort ? Number(process.env.mongoPort) : 27017,
    host: process.env.mongoHost || "127.0.0.1",
    username: process.env.mongoUserName,
    password: process.env.mongoPassword,
    database: process.env.mongoDataBase,
  },
  origin:
    process.env.gatewayDomain && process.env.gatewayPort
      ? `http://${process.env.gatewayDomain}:${process.env.gatewayPort}`
      : "http://localhost:8080",
};

export default config;
