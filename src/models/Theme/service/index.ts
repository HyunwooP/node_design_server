import {
  AppRepository,
  CommonStatusCode,
  CommonStatusMessage,
  getErrorItems,
  onFailureHandler
} from "@/lib";
import { QueryType } from "@/models/Common/type";
import { toObjectId } from "@/utils";
import * as _ from "lodash";
import { ObjectLiteral } from "typeorm";
import { Theme } from "../entity";
import { ThemeRequestType } from "../type";

export const findThemeCount = async (): Promise<String> => {
  try {
    return String(await AppRepository.Theme.count());
  } catch (error: unknown) {
    const _error = getErrorItems(error);

    onFailureHandler({
      status: _error.status,
      message: _error.message,
      data: _error.data,
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
  pipeline: ObjectLiteral[]
): Promise<any> => {
  try {
    return await AppRepository.Theme.aggregate(pipeline).toArray();
  } catch (error: unknown) {
    const _error = getErrorItems(error);

    onFailureHandler({
      status: _error.status,
      message: _error.message,
      data: _error.data,
    });
  }
};

export const findThemeItem = async (): Promise<Theme> => {
  try {
    const theme = new Theme();
    return await aggregateTheme(theme.findThemeItem());
  } catch (error: unknown) {
    const _error = getErrorItems(error);

    onFailureHandler({
      status: _error.status,
      message: _error.message,
      data: _error.data,
    });
  }
};

export const findOneTheme = async (conditions: Partial<ThemeRequestType>): Promise<Theme> => {
  try {
    return await AppRepository.Theme.findOne({ ...conditions });
  } catch (error: unknown) {
    const _error = getErrorItems(error);

    onFailureHandler({
      status: _error.status,
      message: _error.message,
      data: _error.data,
    });
  }
};

export const findTheme = async (
  conditions: Partial<ThemeRequestType>
): Promise<[Theme[], number]> => {
  try {
    let query = {} as QueryType;

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
  } catch (error: unknown) {
    const _error = getErrorItems(error);

    onFailureHandler({
      status: _error.status,
      message: _error.message,
      data: _error.data,
    });
  }
};

export const createTheme = async (conditions: Theme): Promise<Theme> => {
  try {
    return await AppRepository.Theme.create(conditions);
  } catch (error: unknown) {
    const _error = getErrorItems(error);

    onFailureHandler({
      status: _error.status,
      message: _error.message,
      data: _error.data,
    });
  }
};

export const updateTheme = async (conditions: Partial<Theme>): Promise<Theme> => {
  try {
    const theme = await findOneTheme({
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
  } catch (error: unknown) {
    const _error = getErrorItems(error);

    onFailureHandler({
      status: _error.status,
      message: _error.message,
      data: _error.data,
    });
  }
};

export const removeTheme = async (conditions: Partial<Theme>): Promise<object> => {
  try {
    await updateTheme({ _id: conditions._id, isDeleted: true });
    return {};
  } catch (error: unknown) {
    const _error = getErrorItems(error);

    onFailureHandler({
      status: _error.status,
      message: _error.message,
      data: _error.data,
    });
  }
};
