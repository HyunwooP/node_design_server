import {
  AppRepository,
  CommonStatusCode,
  CommonStatusMessage,
  onFailureHandler,
} from "@/lib";
import { CommonPromiseAPIResponseType } from "@/lib/type";
import { QueryType } from "@/models/Common/type";
import { toObjectId } from "@/utils";
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

  await AppRepository.Layout.update(
    { _id: toObjectId(conditions._id) },
    conditions
  );
  return findOneLayout({ _id: toObjectId(conditions._id) });
};

export const removeLayout = async (
  conditions: Partial<Layout>
): CommonPromiseAPIResponseType<object> => {
  await updateLayout({ _id: conditions._id, isDeleted: true });
  return {};
};
