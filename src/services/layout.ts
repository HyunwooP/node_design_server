import { Layout } from "@/entities/Layout";
import {
  CommonPromiseAPIResponse,
  CommonStatusCode,
  CommonStatusMessage,
} from "@/lib";
import AppRepository from "@/repository";
import { Query, Sort } from "@/types/common";
import { LayoutRequest } from "@/types/layout";
import { onFailureHandler } from "@/utils";
import _ from "lodash";

export const findLayoutCount = async (): CommonPromiseAPIResponse<number> => {
  return await AppRepository.Layout.count();
};

export const findOneLayout = async (
  conditions: Partial<LayoutRequest>
): CommonPromiseAPIResponse<Layout> => {
  return await AppRepository.Layout.findOne({ ...conditions });
};

export const findLayout = async (
  conditions: Partial<LayoutRequest>
): CommonPromiseAPIResponse<[Layout[], number]> => {
  let query = {} as Query;

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
      name: conditions.nameSort as Sort,
    };
  }

  return await AppRepository.Layout.findAndCount({
    ...conditions,
    ...query,
  });
};

export const createLayout = async (
  conditions: Layout
): CommonPromiseAPIResponse<Layout> => {
  return await AppRepository.Layout.create(conditions);
};

export const updateLayout = async (
  conditions: Partial<Layout>
): CommonPromiseAPIResponse<Layout> => {
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
): CommonPromiseAPIResponse<object> => {
  await updateLayout({ _id: conditions._id, isDeleted: true });
  return {};
};
