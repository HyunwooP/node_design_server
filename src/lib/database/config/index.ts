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
    host: "127.0.0.1",
    port: 27017,
    username: "root",
    password: config.mongoPassword,
    database: "localDB",
    synchronize: true,
    logging: false,
    dropSchema: true,
    entities: ["src/models/**/*.ts"],
  },
  development: {
    name: "development",
    type: "mongodb",
    host: "",
    port: undefined,
    username: "",
    password: "",
    database: "",
    synchronize: true,
    logging: false,
    dropSchema: true,
    entities: ["src/models/**/*.ts"],
  },
  production: {
    name: "production",
    type: "mongodb",
    host: "",
    port: undefined,
    username: "",
    password: "",
    database: "",
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
