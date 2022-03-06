import env from "@/config";
import { AppRepository } from "@/lib";
import { createConnection } from "typeorm";
import { mongoConfig } from "../config";

export const connectMongo = async (): Promise<void> => {
  try {
    await createConnection({
      ...mongoConfig[env.NODE_ENV],
      useUnifiedTopology: true,
    });
  } catch (error: unknown) {
    console.log(`connectMongo Connect Failed!! ${error}`);
  }
};

export const connectRepository = (): void => {
  AppRepository.connect();
};
