import "dotenv/config";

/**
 * 외부에 노출되는 데이터들이기 때문에 주의해서 사용해야 한다.
 */
export default {
  // "dev" | "production"
  node: process.env.node ?? "dev",
  port: process.env.port ?? 3002,

  // mongo
  mongoPort: process.env.mongoPort ?? 27017,
  mongoHost: process.env.mongoHost ?? "127.0.0.1",
  mongoPassword: process.env.mongoPassword ?? "",

  // domain
  origin:
    process.env.clientDomain && process.env.clientPort
      ? `http://${process.env.clientDomain}:${process.env.clientPort}`
      : "http://localhost:3001",
};
