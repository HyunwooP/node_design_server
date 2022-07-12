import config from "@/config";
import { MongoConnectionOptions } from "typeorm/driver/mongodb/MongoConnectionOptions";

export type TypeOrmConfigType = {
  [key: string]: MongoConnectionOptions;
};

export const mongoConfig: TypeOrmConfigType = {
  localhost: {
    ...config.mongo,
    name: "localhost",
    type: "mongodb",
    synchronize: true,
    logging: false,
    dropSchema: true,
    entities: ["src/models/**/*.ts"],
    poolSize: 5,
    authSource: "admin",
  },
  development: {
    ...config.mongo,
    name: "development",
    type: "mongodb",
    synchronize: true,
    logging: false,
    dropSchema: true,
    entities: ["src/models/**/*.ts"],
    poolSize: 10,
    authSource: "admin",
  },
  production: {
    ...config.mongo,
    name: "production",
    type: "mongodb",
    synchronize: false,
    logging: true,
    entities: ["src/models/**/*.ts"],
    migrationsTableName: "migrations",
    cli: {
      entitiesDir: "src/models/**/*.ts",
      // migrationsDir: "src/migration",
      // subscribersDir: "src/subscriber",
    },
    poolSize: 50,
    authSource: "admin",
  },
};
