import { NodeEnvType } from "@/lib/type";
import "dotenv/config";
import { MongoConnectionOptions } from "typeorm/driver/mongodb/MongoConnectionOptions";

type MongoCustomConfigType = {
  [env in NodeEnvType]: Pick<
    MongoConnectionOptions,
    "port" | "host" | "username" | "database" | "password"
  >;
};

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
    localhost: {
      port: process.env.mongoLostHostPort
        ? Number(process.env.mongoLostHostPort)
        : 27017,
      host: process.env.mongoLocalHost ?? "127.0.0.1",
      username: process.env.mongoLocalHostUserName ?? "root",
      password: process.env.mongoLocalHostPassword ?? "",
      database: process.env.mongoLocalHostDataBase ?? "localDB",
    },
    development: {
      port: process.env.mongoDevelopmentPort
        ? Number(process.env.mongoDevelopmentPort)
        : 27017,
      host: process.env.mongoDevelopmentHost ?? "",
      username: process.env.mongoDevelopmentUserName ?? "",
      password: process.env.mongoDevelopmentPassword ?? "",
      database: process.env.mongoDevelopmentDataBase ?? "",
    },
    production: {
      port: process.env.mongoProductionPort
        ? Number(process.env.mongoProductionPort)
        : 27017,
      host: process.env.mongoProductionHost ?? "",
      username: process.env.mongoProductionUserName ?? "",
      password: process.env.mongoProductionPassword ?? "",
      database: process.env.mongoProductionDataBase ?? "",
    },
  },
  origin:
    process.env.gatewayDomain && process.env.gatewayPort
      ? `http://${process.env.gatewayDomain}:${process.env.gatewayPort}`
      : "http://localhost:8080",
  timezone: process.env.timezone ?? "ko",
};

export default config;
