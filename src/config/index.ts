import { NodeEnvType } from "@/lib/type";
import "dotenv/config";
import { MongoConnectionOptions } from "typeorm/driver/mongodb/MongoConnectionOptions";

type MongoCustomConfigType = Pick<
  MongoConnectionOptions,
  "port" | "host" | "username" | "database" | "password"
>;

export type ConfigType = {
  NODE_ENV: NodeEnvType;
  sentryDSN: string;
  port: string | number;
  mongo: MongoCustomConfigType;
  origin: string;
  timezone: string;
};

/**
 * 외부에 노출되는 데이터들이기 때문에 주의해서 사용해야 한다.
 */
const config: ConfigType = {
  NODE_ENV: (process.env.NODE_ENV as NodeEnvType) ?? "localhost",
  sentryDSN: process.env.sentryDSN ?? "",
  port: process.env.port ?? 3005,
  mongo: {
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
  timezone: process.env.timezone ?? "ko",
};

export default config;
