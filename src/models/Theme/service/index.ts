import * as _ from "lodash";
import { QueryIE } from "../../../models/Common/interface";
import { ObjectLiteral } from "typeorm";
import {
  AppRepository,
  CommonStatusCode,
  CommonStatusMessage,
  onFailureHandler,
} from "../../../lib";
import { toObjectId } from "../../../utils";
import { Theme, ThemeIE } from "../entity";

export const findThemeCount = async (): Promise<String> => {
  try {
    return String(await AppRepository.Theme.count());
  } catch (e) {
    onFailureHandler({
      status: e.status ?? CommonStatusCode.INTERNAL_SERVER_ERROR,
      message: e.message ?? CommonStatusMessage.INTERNAL_SERVER_ERROR,
      data: e.data ?? {},
    });
  }
};

/**
 * @description
 * OneToMany, ManyToOne를 통한 조인형태로 데이터를 가져오려 했으나,
 * 몽고에서 아직 특별히 지원을 안하는 것 같아, Aggregate로 변경
 * (Component, Layout, Style을 한번에 묶어서 Theme에 넣어줘야함.)
 * @returns {Document[]}
 */
export const aggregateTheme = async (
  pipeline?: ObjectLiteral[]
): Promise<any> => {
  try {
    return await AppRepository.Theme.aggregate(pipeline).toArray();
  } catch (e) {
    onFailureHandler({
      status: e.status ?? CommonStatusCode.INTERNAL_SERVER_ERROR,
      message: e.message ?? CommonStatusMessage.INTERNAL_SERVER_ERROR,
      data: e.data ?? {},
    });
  }
};

export const findThemeItem = async (): Promise<ThemeIE> => {
  try {
    const theme = new Theme();
    return await aggregateTheme(theme.findThemeItem());
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
    return await AppRepository.Theme.findOne({ ...conditions });
  } catch (e) {
    onFailureHandler({
      status: e.status ?? CommonStatusCode.INTERNAL_SERVER_ERROR,
      message: e.message ?? CommonStatusMessage.INTERNAL_SERVER_ERROR,
      data: e.data ?? {},
    });
  }
};

export const findTheme = async (
  conditions: ThemeIE
): Promise<[ThemeIE[], number]> => {
  try {
    let query: QueryIE = {
      where: {},
      order: {},
    };

    if (!_.isEmpty(conditions.searchKeyword)) {
      query.where = {
        name: {
          $regex: conditions.searchKeyword,
          $options: "i",
        },
      };
    }

    if (!_.isEmpty(conditions.nameSort)) {
      query.order.name = conditions.nameSort;
    }

    return await AppRepository.Theme.findAndCount({
      ...conditions,
      ...query,
    });
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
    return await AppRepository.Theme.create(conditions);
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
    const theme: ThemeIE = await findOneTheme({
      _id: toObjectId(conditions._id),
    });

    if (_.isUndefined(theme)) {
      onFailureHandler({
        status: CommonStatusCode.NOT_FOUND,
        message: CommonStatusMessage.NOT_FOUND,
      });
    }

    // 스타일 이름
    theme.name = _.isUndefined(conditions.name) ? theme.name : conditions.name;
    // 테마에 포함된 스타일
    theme.styles = _.isUndefined(conditions.styles)
      ? theme.styles
      : conditions.styles;
    // 사용 유무
    theme.isActive = _.isUndefined(conditions.isActive)
      ? theme.isActive
      : conditions.isActive;
    // 삭제 유무
    theme.isDeleted = _.isUndefined(conditions.isDeleted)
      ? theme.isDeleted
      : conditions.isDeleted;

    return await AppRepository.Theme.save(theme);
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
    await updateTheme({ _id: conditions._id, isDeleted: true });
    return {};
  } catch (e) {
    onFailureHandler({
      status: e.status ?? CommonStatusCode.INTERNAL_SERVER_ERROR,
      message: e.message ?? CommonStatusMessage.INTERNAL_SERVER_ERROR,
      data: e.data ?? {},
    });
  }
};
