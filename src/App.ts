import { Application } from "express";
import {
  AppRepository,
  connectMongo,
  connectRepository,
  createExpress,
  createRoute,
  createServer,
} from "./lib";

class App {
  private readonly server: Application = createExpress();

  public onCreateRoute(): void {
    console.log("App Created Route");
    createRoute(this.server);
  }

  public onCreateServer(): void {
    console.log("App Created Server");
    createServer(this.server);
  }

  public async onConnectDB(): Promise<void> {
    console.log("App Connected DB");
    await connectMongo();
  }

  public async onConnectRepository(): Promise<void> {
    console.log("App Connected Repositorys");
    await connectRepository();
  }

  public async onCreateTestSample(): Promise<void> {
    console.log("App Created Test Datas");
    await AppRepository.generateTestData();
  }
}

export default new App();
