import { Application } from "express";
import * as _ from "lodash";
import config from "./config";
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

  public onCreateLocalHostApp = async (): Promise<void> => {
    this.onCreateRoute();
    this.onCreateServer();
    await this.onConnectDB();
    await this.onConnectRepository();
    await this.onCreateTestSample();
  };

  // * localhost환경과 달라야 할 경우 확장
  private onCreateDevelopmentApp = this.onCreateLocalHostApp;

  public onCreateProductionApp = async (): Promise<void> => {
    this.onInitializeSentry();
    this.onCreateRoute();
    this.onCreateServer();
    await this.onConnectDB();
    await this.onConnectRepository();
  };

  private getApplication = (): Function => {
    const applications: {
      [environment: string]: Function;
    } = {
      production: this.onCreateProductionApp,
      development: this.onCreateDevelopmentApp,
      localhost: this.onCreateLocalHostApp,
    };

    const application = applications[config.NODE_ENV];

    if (_.isFunction(application)) {
      console.log(`NODE_ENV =======> ${config.NODE_ENV} Start`);
      return application;
    } else {
      console.log(`NODE_ENV is Undefined!!! So, LocalHost Mode Start`);
      return this.onCreateLocalHostApp;
    }
  };

  public startApplication = async (): Promise<void> => {
    try {
      const application = this.getApplication();
      await application();
    } catch (error: unknown) {
      console.log(error);
    }
  };
}

export default new App();
