import { CommonStatusCode, CommonStatusMessage } from "@/lib";
import { CommonPromiseAPIResponseType } from "@/lib/type";
import { Theme } from "@/models/Theme";
import AppRepository from "@/repository";
import { QueryType, SortType } from "@/types/common";
import { ThemeRequestType } from "@/types/theme";
import { onFailureHandler } from "@/utils";
import _ from "lodash";
import { ObjectLiteral } from "typeorm";

export const findThemeCount =
  async (): CommonPromiseAPIResponseType<number> => {
    return await AppRepository.Theme.count();
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
  return await AppRepository.Theme.aggregate(pipeline).toArray();
};

export const findThemeItem = async (): CommonPromiseAPIResponseType<Theme> => {
  const theme = new Theme();
  return await aggregateTheme(theme.findThemeItem());
};

export const findOneTheme = async (
  conditions: Partial<ThemeRequestType>
): CommonPromiseAPIResponseType<Theme> => {
  return await AppRepository.Theme.findOne({ ...conditions });
};

export const findTheme = async (
  conditions: Partial<ThemeRequestType>
): CommonPromiseAPIResponseType<[Theme[], number]> => {
  let query = {} as QueryType;

  if (!_.isEmpty(conditions.searchKeyword)) {
    query.where = {
      name: {
        $regex: conditions.searchKeyword as string,
        $options: "i",
      },
    };
  }

  if (!_.isEmpty(conditions.nameSort)) {
    query.order = {
      name: conditions.nameSort as SortType,
    };
  }

  return await AppRepository.Theme.findAndCount({
    ...conditions,
    ...query,
  });
};

export const createTheme = async (
  conditions: Theme
): CommonPromiseAPIResponseType<Theme> => {
  return await AppRepository.Theme.create(conditions);
};

export const updateTheme = async (
  conditions: Partial<Theme>
): CommonPromiseAPIResponseType<Theme> => {
  if (_.isUndefined(conditions._id)) {
    onFailureHandler({
      status: CommonStatusCode.BAD_REQUEST,
      message: CommonStatusMessage.BAD_REQUEST,
    });
  }

  await AppRepository.Theme.update({ _id: conditions._id }, conditions);
  return findOneTheme({ _id: conditions._id });
};

export const removeTheme = async (
  conditions: Partial<Theme>
): CommonPromiseAPIResponseType<object> => {
  await updateTheme({ _id: conditions._id, isDeleted: true });
  return {};
};
