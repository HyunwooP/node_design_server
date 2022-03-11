import {
  AppRepository,
  CommonStatusCode,
  CommonStatusMessage,
  getErrorItems,
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
    try {
      return await AppRepository.Layout.count();
    } catch (error: unknown) {
      const _error = getErrorItems(error);

      onFailureHandler({
        status: _error.status,
        message: _error.message,
        data: _error.data,
      });
    }
  };

export const findOneLayout = async (
  conditions: Partial<LayoutRequestType>
): CommonPromiseAPIResponseType<Layout> => {
  try {
    return await AppRepository.Layout.findOne({ ...conditions });
  } catch (error: unknown) {
    const _error = getErrorItems(error);

    onFailureHandler({
      status: _error.status,
      message: _error.message,
      data: _error.data,
    });
  }
};

export const findLayout = async (
  conditions: Partial<LayoutRequestType>
): CommonPromiseAPIResponseType<[Layout[], number]> => {
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

    return await AppRepository.Layout.findAndCount({
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

export const createLayout = async (
  conditions: Layout
): CommonPromiseAPIResponseType<Layout> => {
  try {
    return await AppRepository.Layout.create(conditions);
  } catch (error: unknown) {
    const _error = getErrorItems(error);

    onFailureHandler({
      status: _error.status,
      message: _error.message,
      data: _error.data,
    });
  }
};

export const updateLayout = async (
  conditions: Partial<Layout>
): CommonPromiseAPIResponseType<Layout> => {
  try {
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
  } catch (error: unknown) {
    const _error = getErrorItems(error);

    onFailureHandler({
      status: _error.status,
      message: _error.message,
      data: _error.data,
    });
  }
};

export const removeLayout = async (
  conditions: Partial<Layout>
): CommonPromiseAPIResponseType<object> => {
  try {
    await updateLayout({ _id: conditions._id, isDeleted: true });
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
