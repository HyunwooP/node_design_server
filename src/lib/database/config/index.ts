import config from "@/config";
import { MongoConnectionOptions } from "typeorm/driver/mongodb/MongoConnectionOptions";

export type TypeOrmConfigType = {
  [key: string]: MongoConnectionOptions;
};

export const mongoConfig: TypeOrmConfigType = {
  localhost: {
    ...config.mongo,
    name: "localhost",
    synchronize: true,
    logging: false,
    dropSchema: true,
    entities: ["src/entities/**/*.ts"],
    poolSize: 5,
    authSource: "admin",
  },
  development: {
    ...config.mongo,
    name: "development",
    synchronize: false,
    logging: false,
    entities: ["src/entities/**/*.ts"],
    poolSize: 10,
    authSource: "admin",
  },
  production: {
    ...config.mongo,
    name: "production",
    synchronize: false,
    logging: true,
    entities: ["src/entities/**/*.ts"],
    migrationsTableName: "migrations",
    cli: {
      entitiesDir: "src/entities",
      // migrationsDir: "src/migration",
      // subscribersDir: "src/subscriber",
    },
    poolSize: 50,
    authSource: "admin",
  },
};
