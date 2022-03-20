import { ConfigType, NodeEnvType } from "@/lib/type";
import "dotenv/config";

/**
 * 외부에 노출되는 데이터들이기 때문에 주의해서 사용해야 한다.
 */
const config: ConfigType = {
  // "development" | "production" | "localhost"
  NODE_ENV: (process.env.NODE_ENV as NodeEnvType) ?? "localhost",
  sentryDSN: process.env.sentryDSN ?? "",
  port: process.env.port ?? 3005,
  mongoPort: process.env.mongoPort ?? 27017,
  mongoHost: process.env.mongoHost ?? "127.0.0.1",
  mongoPassword: process.env.mongoPassword ?? "",
  origin:
    process.env.gatewayDomain && process.env.gatewayPort
      ? `http://${process.env.gatewayDomain}:${process.env.gatewayPort}`
      : "http://localhost:8080",
};

export default config;
