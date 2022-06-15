import config from "@/config";
import { ErrorStatusMessage } from "@/lib/status";
import { Component } from "@/models/Component";
import { Layout } from "@/models/Layout";
import { Style } from "@/models/Style";
import { Theme } from "@/models/Theme";
import _ from "lodash";
import { getManager, MongoRepository } from "typeorm";

class AppRepository {
  private component: MongoRepository<Component> | null = null;
  private layout: MongoRepository<Layout> | null = null;
  private style: MongoRepository<Style> | null = null;
  private theme: MongoRepository<Theme> | null = null;

  connect(): void {
    this.component = getManager(config.NODE_ENV).getMongoRepository(Component);
    this.layout = getManager(config.NODE_ENV).getMongoRepository(Layout);
    this.style = getManager(config.NODE_ENV).getMongoRepository(Style);
    this.theme = getManager(config.NODE_ENV).getMongoRepository(Theme);
  }

  get Component(): MongoRepository<Component> {
    if (_.isNull(this.component)) {
      throw new Error(`Component ${ErrorStatusMessage.IS_EMPTY_REPOSITORY}`);
    }

    return this.component;
  }

  get Layout(): MongoRepository<Layout> {
    if (_.isNull(this.layout)) {
      throw new Error(`Layout ${ErrorStatusMessage.IS_EMPTY_REPOSITORY}`);
    }

    return this.layout;
  }

  get Style(): MongoRepository<Style> {
    if (_.isNull(this.style)) {
      throw new Error(`Style ${ErrorStatusMessage.IS_EMPTY_REPOSITORY}`);
    }

    return this.style;
  }

  get Theme(): MongoRepository<Theme> {
    if (_.isNull(this.theme)) {
      throw new Error(`Theme ${ErrorStatusMessage.IS_EMPTY_REPOSITORY}`);
    }

    return this.theme;
  }
}

export default new AppRepository();
