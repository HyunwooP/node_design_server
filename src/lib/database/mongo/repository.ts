import config from "@/config";
import { Component } from "@/models/Component/entity";
import { Layout } from "@/models/Layout/entity";
import { Style } from "@/models/Style/entity";
import { Theme } from "@/models/Theme/entity";
import { getManager, MongoRepository } from "typeorm";
import { sampleComponents } from "./sample/component";
import { sampleLayouts } from "./sample/layout";
import { sampleStyles } from "./sample/style";
import { sampleTheme } from "./sample/theme";

class AppRepository {
  private component!: MongoRepository<Component>;
  private layout!: MongoRepository<Layout>;
  private style!: MongoRepository<Style>;
  private theme!: MongoRepository<Theme>;

  async generateTestData(): Promise<void> {
    const styleInfos: any = [];
    const layoutInfos: any = {
      BLACK_THEME_STYLE: [],
      WHITE_THEME_STYLE: [],
      GREEN_THEME_STYLE: [],
    };
    const componentInfos: any = {
      BLACK_THEME_STYLE: [],
      WHITE_THEME_STYLE: [],
      GREEN_THEME_STYLE: [],
    };

    // Generate Component Collection
    const generateComponentCollection = async () => {
      const componentNames = Object.keys(sampleComponents);
      for (const name of componentNames) {
        const component = new Component();
        component.name = name;
        component.attribute = sampleComponents[name];

        const outputComponent = await this.component.save(component);
        if (outputComponent.name.indexOf("BLACK_THEME") !== -1) {
          componentInfos.BLACK_THEME_STYLE.push(outputComponent._id);
        } else if (outputComponent.name.indexOf("WHITE_THEME") !== -1) {
          componentInfos.WHITE_THEME_STYLE.push(outputComponent._id);
        } else if (outputComponent.name.indexOf("GREEN_THEME") !== -1) {
          componentInfos.GREEN_THEME_STYLE.push(outputComponent._id);
        }
      }
    };

    // Generate Layout Collection
    const generateLayoutCollection = async () => {
      const layoutNames = Object.keys(sampleLayouts);
      for (const name of layoutNames) {
        const layout = new Layout();
        layout.name = name;
        layout.attribute = sampleLayouts[name];

        const outputLayout = await this.layout.save(layout);
        if (outputLayout.name.indexOf("BLACK_THEME") !== -1) {
          layoutInfos.BLACK_THEME_STYLE.push(outputLayout._id);
        } else if (outputLayout.name.indexOf("WHITE_THEME") !== -1) {
          layoutInfos.WHITE_THEME_STYLE.push(outputLayout._id);
        } else if (outputLayout.name.indexOf("GREEN_THEME") !== -1) {
          layoutInfos.GREEN_THEME_STYLE.push(outputLayout._id);
        }
      }
    };

    // Generate Style Collection
    const generateStyleCollection = async () => {
      for (const name of sampleStyles) {
        const style = new Style();
        style.name = name;
        style.components = componentInfos[name];
        style.layouts = layoutInfos[name];
        const outputStyle = await this.style.save(style);
        styleInfos.push(outputStyle._id);
      }
    };

    // Generate Theme Collection
    const generateThemeCollection = async () => {
      for (const name of sampleTheme) {
        const theme = new Theme();
        theme.name = name;
        // populate or aggregation
        theme.styles = styleInfos;
        await this.theme.save(theme);
      }
    };

    await generateComponentCollection();
    await generateLayoutCollection();
    await generateStyleCollection();
    await generateThemeCollection();
  }

  connect(): void {
    this.component = getManager(config.NODE_ENV).getMongoRepository(Component);
    this.layout = getManager(config.NODE_ENV).getMongoRepository(Layout);
    this.style = getManager(config.NODE_ENV).getMongoRepository(Style);
    this.theme = getManager(config.NODE_ENV).getMongoRepository(Theme);
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
