import { Application } from "express";
import {
  AppRepository,
  connectMongo,
  connectRepository,
  createExpress,
  createRoute,
  createServer,
  initializeSentry,
} from "./lib";

class App {
  private readonly server: Application = createExpress();

  private onInitializeSentry(): void {
    console.log("App Initialize Sentry");
    initializeSentry(this.server);
  }

  private onCreateRoute(): void {
    console.log("App Created Route");
    createRoute(this.server);
  }

  private onCreateServer(): void {
    console.log("App Created Server");
    createServer(this.server);
  }

  private async onConnectDB(): Promise<void> {
    console.log("App Connected DB");
    await connectMongo();
  }

  private async onConnectRepository(): Promise<void> {
    console.log("App Connected Repositorys");
    await connectRepository();
  }

  private async onCreateTestSample(): Promise<void> {
    console.log("App Created Test Datas");
    await AppRepository.generateTestData();
  }

  public onCreateDevelopmentApp = async (): Promise<void> => {
    this.onCreateRoute();

    this.onCreateServer();

    await this.onConnectDB();

    await this.onConnectRepository();

    await this.onCreateTestSample();
  };

  public onCreateProductionApp = async (): Promise<void> => {
    this.onInitializeSentry();

    this.onCreateRoute();

    this.onCreateServer();

    await this.onConnectDB();

    await this.onConnectRepository();
  };
}

export default new App();
