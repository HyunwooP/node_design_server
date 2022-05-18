import config from "@/config";
import { MongoConnectionOptions } from "typeorm/driver/mongodb/MongoConnectionOptions";

export type TypeOrmConfigType = {
  [key: string]: MongoConnectionOptions;
};

export const mongoConfig: TypeOrmConfigType = {
  localhost: {
    ...config.mongo.localhost,
    name: "localhost",
    type: "mongodb",
    synchronize: true,
    logging: false,
    dropSchema: true,
    entities: ["src/models/**/*.ts"],
  },
  development: {
    ...config.mongo.development,
    name: "development",
    type: "mongodb",
    synchronize: true,
    logging: false,
    dropSchema: true,
    entities: ["src/models/**/*.ts"],
  },
  production: {
    ...config.mongo.production,
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
  },
};
