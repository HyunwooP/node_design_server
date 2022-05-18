import { AppRepository, CommonStatusCode, CommonStatusMessage } from "@/lib";
import { CommonPromiseAPIResponseType } from "@/lib/type";
import { QueryType, SortType } from "@/models/Common/type";
import { onFailureHandler } from "@/utils";
import * as _ from "lodash";
import { Layout } from "../entity";
import { LayoutRequestType } from "../type";

export const findLayoutCount =
  async (): CommonPromiseAPIResponseType<number> => {
    return await AppRepository.Layout.count();
  };

export const findOneLayout = async (
  conditions: Partial<LayoutRequestType>
): CommonPromiseAPIResponseType<Layout> => {
  return await AppRepository.Layout.findOne({ ...conditions });
};

export const findLayout = async (
  conditions: Partial<LayoutRequestType>
): CommonPromiseAPIResponseType<[Layout[], number]> => {
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

  return await AppRepository.Layout.findAndCount({
    ...conditions,
    ...query,
  });
};

export const createLayout = async (
  conditions: Layout
): CommonPromiseAPIResponseType<Layout> => {
  return await AppRepository.Layout.create(conditions);
};

export const updateLayout = async (
  conditions: Partial<Layout>
): CommonPromiseAPIResponseType<Layout> => {
  if (_.isUndefined(conditions._id)) {
    onFailureHandler({
      status: CommonStatusCode.BAD_REQUEST,
      message: CommonStatusMessage.BAD_REQUEST,
    });
  }

  await AppRepository.Layout.update({ _id: conditions._id }, conditions);
  return findOneLayout({ _id: conditions._id });
};

export const removeLayout = async (
  conditions: Partial<Layout>
): CommonPromiseAPIResponseType<object> => {
  await updateLayout({ _id: conditions._id, isDeleted: true });
  return {};
};
