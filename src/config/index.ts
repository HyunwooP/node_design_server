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

/**
 * 외부에 노출되는 데이터들이기 때문에 주의해서 사용해야 한다.
 */
const config: Config = {
  NODE_ENV: (process.env.NODE_ENV as NodeEnvironment) ?? "localhost",
  sentryDSN: process.env.sentryDSN ?? "",
  port: process.env.port ?? 3005,
  mongo: {
    type: "mongodb",
    port: process.env.mongoPort ? Number(process.env.mongoPort) : 27017,
    host: process.env.mongoHost ?? "127.0.0.1",
    username: process.env.mongoUserName ?? "root",
    password: process.env.mongoPassword ?? "",
    database: process.env.mongoDataBase ?? "localDB",
  },
  origin:
    process.env.gatewayDomain && process.env.gatewayPort
      ? `http://${process.env.gatewayDomain}:${process.env.gatewayPort}`
      : "http://localhost:8080",
};

export default config;
