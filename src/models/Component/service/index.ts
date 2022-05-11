import {
  AppRepository,
  CommonStatusCode,
  CommonStatusMessage
} from "@/lib";
import { CommonPromiseAPIResponseType } from "@/lib/type";
import { QueryType } from "@/models/Common/type";
import { onFailureHandler, toObjectId } from "@/utils";
import * as _ from "lodash";
import { Component } from "../entity";
import { ComponentRequestType } from "../type";

export const findComponentCount =
  async (): CommonPromiseAPIResponseType<number> => {
    return await AppRepository.Component.count();
  };

export const findOneComponent = async (
  conditions: Partial<ComponentRequestType>
): CommonPromiseAPIResponseType<Component> => {
  return await AppRepository.Component.findOne({ ...conditions });
};

export const findComponent = async (
  conditions: Partial<ComponentRequestType>
): CommonPromiseAPIResponseType<[Component[], number]> => {
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

  return await AppRepository.Component.findAndCount({
    ...conditions,
    ...query,
  });
};

export const createComponent = async (
  conditions: Component
): CommonPromiseAPIResponseType<Component> => {
  return await AppRepository.Component.create(conditions);
};

export const updateComponent = async (
  conditions: Partial<Component>
): CommonPromiseAPIResponseType<Component> => {
  if (_.isUndefined(conditions._id)) {
    onFailureHandler({
      status: CommonStatusCode.BAD_REQUEST,
      message: CommonStatusMessage.BAD_REQUEST,
    });
  }

  await AppRepository.Component.update(
    { _id: toObjectId(conditions._id) },
    conditions
  );
  return findOneComponent({ _id: toObjectId(conditions._id) });
};

export const removeComponent = async (
  conditions: Partial<Component>
): CommonPromiseAPIResponseType<object> => {
  await updateComponent({ _id: conditions._id, isDeleted: true });
  return {};
};
