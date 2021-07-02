import * as _ from "lodash";
import {
  AppRepository,
  CommonStatusCode,
  CommonStatusMessage,
  onFailureHandler,
} from "../../../lib";
import { ThemeIE } from "../entity";

/**
 * @description
 * OneToMany, ManyToOne를 통한 조인형태로 데이터를 가져오려 했으나,
 * 몽고에서 아직 특별히 지원을 안하는 것 같아, Aggregate로 변경
 * (Component, Layout, Style을 한번에 묶어서 Theme에 넣어줘야함.)
 * @returns {Document[]}
 */
export const aggregateTheme = async (): Promise<any> => {
  try {
    /**
     * Common Theme Query - join style (layouts, components)
     * todo = Theme Service -> aggregate -> return value
     */
    return await AppRepository.Theme.aggregate([
      {
        $lookup: {
          from: "Style",
          let: { styleId: "$styles" },
          pipeline: [{ $match: { $expr: { $in: ["$_id", "$$styleId"] } } }],
          as: "styles",
        },
      },
      { $unwind: "$styles" },
      {
        $lookup: {
          from: "Layout",
          let: { layoutId: "$styles.layout" },
          pipeline: [{ $match: { $expr: { $in: ["$_id", "$$layoutId"] } } }],
          as: "styles.layout",
        },
      },
      {
        $lookup: {
          from: "Component",
          let: { componentId: "$styles.component" },
          pipeline: [{ $match: { $expr: { $in: ["$_id", "$$componentId"] } } }],
          as: "styles.component",
        },
      },
    ]).toArray();
  } catch (e) {
    onFailureHandler({
      status: e.status ?? CommonStatusCode.INTERNAL_SERVER_ERROR,
      message: e.message ?? CommonStatusMessage.INTERNAL_SERVER_ERROR,
      data: e.data ?? {},
    });
  }
};

export const findOneTheme = async (conditions: ThemeIE): Promise<ThemeIE> => {
  try {
    return await AppRepository.Theme.findOne({
      ...conditions,
      isActive: true,
      isDeleted: false,
    });
  } catch (e) {
    onFailureHandler({
      status: e.status ?? CommonStatusCode.INTERNAL_SERVER_ERROR,
      message: e.message ?? CommonStatusMessage.INTERNAL_SERVER_ERROR,
      data: e.data ?? {},
    });
  }
};

export const findTheme = async (conditions: ThemeIE): Promise<ThemeIE[]> => {
  try {
    const theme: any = await AppRepository.Theme.find({
      ...conditions,
      isActive: true,
      isDeleted: false,
    });

    const testThemeData: any = await aggregateTheme();
    console.log(testThemeData[0].styles.component);
    console.log(testThemeData[0].styles.layout);

    return theme;
  } catch (e) {
    onFailureHandler({
      status: e.status ?? CommonStatusCode.INTERNAL_SERVER_ERROR,
      message: e.message ?? CommonStatusMessage.INTERNAL_SERVER_ERROR,
      data: e.data ?? {},
    });
  }
};

export const createTheme = async (conditions: ThemeIE): Promise<ThemeIE> => {
  try {
    return await AppRepository.Theme.save(conditions);
  } catch (e) {
    onFailureHandler({
      status: e.status ?? CommonStatusCode.INTERNAL_SERVER_ERROR,
      message: e.message ?? CommonStatusMessage.INTERNAL_SERVER_ERROR,
      data: e.data ?? {},
    });
  }
};

export const updateTheme = async (conditions: ThemeIE): Promise<ThemeIE> => {
  try {
    const Theme: ThemeIE = await findOneTheme({ id: conditions.id });

    if (_.isUndefined(Theme)) {
      onFailureHandler({
        status: CommonStatusCode.NOT_FOUND,
        message: CommonStatusMessage.NOT_FOUND,
      });
    }

    return await AppRepository.Theme.save(conditions);
  } catch (e) {
    onFailureHandler({
      status: e.status ?? CommonStatusCode.INTERNAL_SERVER_ERROR,
      message: e.message ?? CommonStatusMessage.INTERNAL_SERVER_ERROR,
      data: e.data ?? {},
    });
  }
};

export const removeTheme = async (conditions: ThemeIE): Promise<object> => {
  try {
    await updateTheme({ id: conditions.id, isDeleted: true });
    return {};
  } catch (e) {
    onFailureHandler({
      status: e.status ?? CommonStatusCode.INTERNAL_SERVER_ERROR,
      message: e.message ?? CommonStatusMessage.INTERNAL_SERVER_ERROR,
      data: e.data ?? {},
    });
  }
};
