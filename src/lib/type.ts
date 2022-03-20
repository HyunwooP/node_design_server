export type NodeEnvType = "production" | "development" | "localhost";

export type UnknownObject<T = unknown> = Record<string, T>;

export type CommonAPIResponseType<T> = T | undefined;

export type CommonPromiseAPIResponseType<T> = Promise<T | undefined>;

export type ConfigType = {
  NODE_ENV: NodeEnvType;
  sentryDSN: string;
  port: string | number;
  mongoPort: string | number;
  mongoHost: string;
  mongoPassword: string;
  origin: string;
};
