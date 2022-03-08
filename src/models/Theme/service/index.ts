import { AppRepository, getErrorItems, onFailureHandler } from "@/lib";
import { CommonPromiseAPIResponseType } from "@/lib/type";
import { QueryType } from "@/models/Common/type";
import { toObjectId } from "@/utils";
import * as _ from "lodash";
import { ObjectLiteral } from "typeorm";
import { Theme } from "../entity";
import { ThemeRequestType } from "../type";

export const findThemeCount =
  async (): CommonPromiseAPIResponseType<number> => {
    try {
      return await AppRepository.Theme.count();
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
): CommonPromiseAPIResponseType<any> => {
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

export const findThemeItem = async (): CommonPromiseAPIResponseType<Theme> => {
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

export const findOneTheme = async (
  conditions: Partial<ThemeRequestType>
): CommonPromiseAPIResponseType<Theme> => {
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
): CommonPromiseAPIResponseType<[Theme[], number]> => {
  try {
    let query = {} as QueryType;

    if (!_.isUndefined(conditions.searchKeyword)) {
      query.where = {
        name: {
          $regex: conditions.searchKeyword,
          $options: "i",
        },
      };
    }

    if (!_.isUndefined(conditions.nameSort)) {
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

export const createTheme = async (
  conditions: Theme
): CommonPromiseAPIResponseType<Theme> => {
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

export const updateTheme = async (
  conditions: Partial<Theme>
): CommonPromiseAPIResponseType<Theme> => {
  try {
    await AppRepository.Theme.update(
      { _id: toObjectId(conditions._id) },
      conditions
    );
    return findOneTheme({ _id: toObjectId(conditions._id) });
  } catch (error: unknown) {
    const _error = getErrorItems(error);

    onFailureHandler({
      status: _error.status,
      message: _error.message,
      data: _error.data,
    });
  }
};

export const removeTheme = async (
  conditions: Partial<Theme>
): CommonPromiseAPIResponseType<object> => {
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
