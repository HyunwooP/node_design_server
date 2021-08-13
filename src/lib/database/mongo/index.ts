import * as _ from "lodash";
import {
  createConnection,
  getManager,
  MongoRepository,
  ObjectID,
} from "typeorm";
import env from "../../../config";
import { mongoConfig } from "../config";

import { Theme } from "../../../models/Theme/entity";
import { Style } from "../../../models/Style/entity";
import { Layout } from "../../../models/Layout/entity";
import { Component } from "../../../models/Component/entity";

import { sampleTheme } from "./sample/theme";
import { sampleStyles } from "./sample/style";
import { sampleLayouts } from "./sample/layout";
import { sampleComponents } from "./sample/component";

export const generateTestData = async (): Promise<void> => {
  let styleInfos: any = [];
  let layoutInfos: any = {
    BLACK_THEME: [],
    WHITE_THEME: [],
    GREEN_THEME: [],
  };
  let componentInfos: any = {
    BLACK_THEME: [],
    WHITE_THEME: [],
    GREEN_THEME: [],
  };

  // Generate Component Collection
  const generateComponentCollection = async () => {
    const componentNames = Object.keys(sampleComponents);
    for (const name of componentNames) {
      const component = new Component();
      component.name = name;
      component.attribute = sampleComponents[name];

      const outputComponent = await AppRepository.Component.save(component);
      if (outputComponent.name.indexOf("BLACK_THEME") !== -1) {
        componentInfos.BLACK_THEME.push(outputComponent._id);
      } else if (outputComponent.name.indexOf("WHITE_THEME") !== -1) {
        componentInfos.WHITE_THEME.push(outputComponent._id);
      } else if (outputComponent.name.indexOf("GREEN_THEME") !== -1) {
        componentInfos.GREEN_THEME.push(outputComponent._id);
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

      const outputLayout = await AppRepository.Layout.save(layout);
      if (outputLayout.name.indexOf("BLACK_THEME") !== -1) {
        layoutInfos.BLACK_THEME.push(outputLayout._id);
      } else if (outputLayout.name.indexOf("WHITE_THEME") !== -1) {
        layoutInfos.WHITE_THEME.push(outputLayout._id);
      } else if (outputLayout.name.indexOf("GREEN_THEME") !== -1) {
        layoutInfos.GREEN_THEME.push(outputLayout._id);
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
      const outputStyle = await AppRepository.Style.save(style);
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
      await AppRepository.Theme.save(theme);
    }
  };

  try {
    await generateComponentCollection();
    await generateLayoutCollection();
    await generateStyleCollection();
    await generateThemeCollection();
  } catch (e) {
    console.log("generateTestData Failed!!", e);
  }
};

export const connectMongo = async (): Promise<void> => {
  const option: any = {
    ...mongoConfig[env.node],
    password: env.mongoPassword,
    useUnifiedTopology: true,
  };
  try {
    await createConnection(option);
  } catch (e) {
    console.log(`connectMongo Connect Failed!! ${e}`);
  }
};

export const AppRepository: {
  Theme?: MongoRepository<Theme>;
  Style?: MongoRepository<Style>;
  Layout?: MongoRepository<Layout>;
  Component?: MongoRepository<Component>;
} = {};
export const connectRepository = async (): Promise<void> => {
  if (_.isEmpty(AppRepository)) {
    AppRepository.Theme = getManager(env.node).getMongoRepository(Theme);
    AppRepository.Style = getManager(env.node).getMongoRepository(Style);
    AppRepository.Layout = getManager(env.node).getMongoRepository(Layout);
    AppRepository.Component = getManager(env.node).getMongoRepository(
      Component
    );
  }
};
