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
  let styleInfo: any = [];
  let layoutIds: ObjectID[] = [];
  let componentIds: ObjectID[] = [];

  // Generate Component Collection
  const generateComponentCollection = async () => {
    const componentNames = Object.keys(sampleComponents);
    for (const name of componentNames) {
      const component = new Component();
      component.name = name;
      component.attribute = sampleComponents[name];

      const outputComponent = await AppRepository.Component.save(component);
      componentIds.push(outputComponent.id);
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
      layoutIds.push(outputLayout.id);
    }
  };

  // Generate Style Collection
  const generateStyleCollection = async () => {
    for (let i = 0; i < sampleStyles.length; i++) {
      const style = new Style();
      style.name = sampleStyles[i];

      // todo: 로우별 다양한 컴포넌트와 레이아웃으로 섞기
      style.component = componentIds;
      style.layout = layoutIds;
      style.isActive = i % 2 === 0;

      const outputStyle = await AppRepository.Style.save(style);
      styleInfo.push(outputStyle);
    }
  };

  // Generate Theme Collection
  const generateThemeCollection = async () => {
    for (const name of sampleTheme) {
      const theme = new Theme();
      const styles: ObjectID[] = [];
      theme.name = name;

      styleInfo.forEach((children: Style) => {
        if (children.isActive === true) {
          styles.push(children.id);
        }
      });

      // populate or aggregation
      theme.styles = styles;
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
