import config from "@/config";
import { Component } from "@/entities/Component";
import { Layout } from "@/entities/Layout";
import { Style } from "@/entities/Style";
import { Theme } from "@/entities/Theme";
import { ErrorStatusMessage } from "@/lib/status";
import _ from "lodash";
import { getManager, MongoRepository } from "typeorm";

class AppRepository {
  private component: MongoRepository<Component> | null = null;
  private layout: MongoRepository<Layout> | null = null;
  private style: MongoRepository<Style> | null = null;
  private theme: MongoRepository<Theme> | null = null;

  connect(): void {
    const manager = getManager(config.NODE_ENV);

    this.component = manager.getMongoRepository(Component);
    this.layout = manager.getMongoRepository(Layout);
    this.style = manager.getMongoRepository(Style);
    this.theme = manager.getMongoRepository(Theme);
  }

  get Component(): MongoRepository<Component> {
    if (_.isNull(this.component)) {
      throw new Error(`Component ${ErrorStatusMessage.IS_NULL_REPOSITORY}`);
    }

    return this.component;
  }

  get Layout(): MongoRepository<Layout> {
    if (_.isNull(this.layout)) {
      throw new Error(`Layout ${ErrorStatusMessage.IS_NULL_REPOSITORY}`);
    }

    return this.layout;
  }

  get Style(): MongoRepository<Style> {
    if (_.isNull(this.style)) {
      throw new Error(`Style ${ErrorStatusMessage.IS_NULL_REPOSITORY}`);
    }

    return this.style;
  }

  get Theme(): MongoRepository<Theme> {
    if (_.isNull(this.theme)) {
      throw new Error(`Theme ${ErrorStatusMessage.IS_NULL_REPOSITORY}`);
    }

    return this.theme;
  }
}

export default new AppRepository();
