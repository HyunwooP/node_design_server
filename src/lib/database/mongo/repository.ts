import env from "@/config";
import { Component } from "@/models/Component/entity";
import { Layout } from "@/models/Layout/entity";
import { Style } from "@/models/Style/entity";
import { Theme } from "@/models/Theme/entity";
import { getManager, MongoRepository } from "typeorm";

class AppRepository {
  private component!: MongoRepository<Component>;
  private layout!: MongoRepository<Layout>;
  private style!: MongoRepository<Style>;
  private theme!: MongoRepository<Theme>;

  connect(): void {
    this.component = getManager(env.NODE_ENV).getMongoRepository(Component);
    this.layout = getManager(env.NODE_ENV).getMongoRepository(Layout);
    this.style = getManager(env.NODE_ENV).getMongoRepository(Style);
    this.theme = getManager(env.NODE_ENV).getMongoRepository(Theme);
  }

  get Component(): MongoRepository<Component> {
    return this.component;
  }

  get Layout(): MongoRepository<Layout> {
    return this.layout;
  }

  get Style(): MongoRepository<Style> {
    return this.style;
  }

  get Theme(): MongoRepository<Theme> {
    return this.theme;
  }
}

export default new AppRepository();