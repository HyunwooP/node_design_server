import {
  AppRepository,
  CommonStatusCode,
  CommonStatusMessage
} from "@/lib";
import { CommonPromiseAPIResponseType } from "@/lib/type";
import { QueryType } from "@/models/Common/type";
import { onFailureHandler, toObjectId } from "@/utils";
import * as _ from "lodash";
import { ObjectLiteral } from "typeorm";
import { Theme } from "../entity";
import { ThemeRequestType } from "../type";

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

  await AppRepository.Theme.update(
    { _id: toObjectId(conditions._id) },
    conditions
  );
  return findOneTheme({ _id: toObjectId(conditions._id) });
};

export const removeTheme = async (
  conditions: Partial<Theme>
): CommonPromiseAPIResponseType<object> => {
  await updateTheme({ _id: conditions._id, isDeleted: true });
  return {};
};
