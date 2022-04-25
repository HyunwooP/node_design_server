import config from "@/config";
import { MongoConnectionOptions } from "typeorm/driver/mongodb/MongoConnectionOptions";

export type TypeOrmConfigType = {
  [key: string]: MongoConnectionOptions;
};

/**
 * Typeorm Mongo config
 */
export const mongoConfig: TypeOrmConfigType = {
  localhost: {
    name: "localhost",
    type: "mongodb",
    host: config.mongoHost,
    port: Number(config.mongoPort),
    username: config.mongoUserName,
    password: config.mongoPassword,
    database: config.mongoDataBase,
    synchronize: true,
    logging: false,
    dropSchema: true,
    entities: ["src/models/**/*.ts"],
  },
  development: {
    name: "development",
    type: "mongodb",
    host: config.mongoHost,
    port: Number(config.mongoPort),
    username: config.mongoUserName,
    password: config.mongoPassword,
    database: config.mongoDataBase,
    synchronize: true,
    logging: false,
    dropSchema: true,
    entities: ["src/models/**/*.ts"],
  },
  production: {
    name: "production",
    type: "mongodb",
    host: config.mongoHost,
    port: Number(config.mongoPort),
    username: config.mongoUserName,
    password: config.mongoPassword,
    database: config.mongoDataBase,
    synchronize: false,
    logging: true,
    entities: ["src/models/**/*.ts"],
    migrationsTableName: "migrations",
    cli: {
      entitiesDir: "src/models/**/*.ts",
      // migrationsDir: "src/migration",
      // subscribersDir: "src/subscriber",
    },
  },
};
