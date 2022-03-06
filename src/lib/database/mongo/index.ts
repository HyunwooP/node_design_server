import env from "@/config";
import { AppRepository } from "@/lib";
import { createConnection } from "typeorm";
import { mongoConfig } from "../config";

export const connectMongo = async (): Promise<void> => {
  await createConnection({
    ...mongoConfig[env.NODE_ENV],
    useUnifiedTopology: true,
  });
};

export const connectRepository = (): void => {
  AppRepository.connect();
};
