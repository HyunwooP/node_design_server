import AppRepository from "@/repository";
import { ObjectId } from "mongodb";
import { sampleComponents } from "./component";
import { sampleLayouts } from "./layout";
import { sampleStyles } from "./style";
import { sampleTheme } from "./theme";

const generateTestData = async (): Promise<void> => {
  const styleInfos = [] as ObjectId[];
  const layoutInfos = {
    BLACK_THEME_STYLE: [],
    WHITE_THEME_STYLE: [],
    GREEN_THEME_STYLE: [],
  } as {
    [name: string]: ObjectId[];
  };
  const componentInfos = {
    BLACK_THEME_STYLE: [],
    WHITE_THEME_STYLE: [],
    GREEN_THEME_STYLE: [],
  } as {
    [name: string]: ObjectId[];
  };

  // Generate Component Collection
  const generateComponentCollection = async () => {
    const componentNames = Object.keys(sampleComponents);
    for (const name of componentNames) {
      const component = await AppRepository.Component.create({
        name,
        attribute: sampleComponents[name]
      });

      const outputComponent = await AppRepository.Component.save(component);
      
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
      const layout = await AppRepository.Layout.create({
        name,
        attribute: sampleLayouts[name]
      });

      const outputLayout = await AppRepository.Layout.save(layout);
      
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
      const style = await AppRepository.Style.create({
        name,
        components: componentInfos[name],
        layouts: layoutInfos[name]
      });
      
      const outputStyle = await AppRepository.Style.save(style);
      styleInfos.push(outputStyle._id);
    }
  };

  // Generate Theme Collection
  const generateThemeCollection = async () => {
    for (const name of sampleTheme) {
      const theme = await AppRepository.Theme.create({
        name,
        styles: styleInfos // populate or aggregation
      });
      
      AppRepository.Theme.save(theme);
    }
  };

  await generateComponentCollection();
  await generateLayoutCollection();
  await generateStyleCollection();
  await generateThemeCollection();
};

export default generateTestData;
