import { NodeEnvType } from "@/lib/type";
import "dotenv/config";

export type ConfigType = {
  NODE_ENV: NodeEnvType;
  sentryDSN: string;
  port: string | number;
  mongoUserName: string;
  mongoPort: string | number;
  mongoHost: string;
  mongoPassword: string;
  mongoDataBase: string;
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
  mongoUserName: process.env.mongoUserName ?? "root",
  mongoPort: process.env.mongoPort ?? 27017,
  mongoHost: process.env.mongoHost ?? "127.0.0.1",
  mongoPassword: process.env.mongoPassword ?? "",
  mongoDataBase: process.env.mongoDataBase ?? "localDB",
  origin:
    process.env.gatewayDomain && process.env.gatewayPort
      ? `http://${process.env.gatewayDomain}:${process.env.gatewayPort}`
      : "http://localhost:8080",
  timezone: process.env.timezone ?? "ko",
};

export default config;
