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

import { sampleTheme } from "./sample/theme";
import { sampleStyles } from "./sample/style";

export const generateTestData = async (): Promise<void> => {
  let styleInfo: any = [];

  // Generate Style Collection
  const generateStyleCollection = async () => {
    const styleNames = Object.keys(sampleStyles);
    for (const name of styleNames) {
      const style = new Style();
      style.name = name;
      style.attribute = sampleStyles[name];

      const outputStyle = await AppRepository.Style.save(style);
      styleInfo.push({
        styleName: outputStyle.name,
        styleId: outputStyle.id,
      });
    }
  };

  // Generate Theme Collection
  const generateThemeCollection = async () => {
    for (const name of sampleTheme) {
      const theme = new Theme();
      const styleIds: ObjectID[] = [];
      theme.name = name;

      for (const { styleName, styleId } of styleInfo) {
        if (styleName.includes(name)) {
          styleIds.push(styleId);
        }
      }

      // populate or aggregation
      theme.styles = styleIds;
      AppRepository.Theme.save(theme);
    }
  };

  try {
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
} = {};
export const connectRepository = async (): Promise<void> => {
  if (_.isEmpty(AppRepository)) {
    AppRepository.Theme = getManager(env.node).getMongoRepository(Theme);
    AppRepository.Style = getManager(env.node).getMongoRepository(Style);
  }
};
