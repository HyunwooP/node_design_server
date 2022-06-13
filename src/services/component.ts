import { AppRepository, CommonStatusCode, CommonStatusMessage } from "@/lib";
import { CommonPromiseAPIResponseType } from "@/lib/type";
import { Component } from "@/models/Component";
import { QueryType, SortType } from "@/types/common";
import { ComponentRequestType } from "@/types/component";
import { onFailureHandler } from "@/utils";
import * as _ from "lodash";

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

  await AppRepository.Component.update({ _id: conditions._id }, conditions);
  return findOneComponent({ _id: conditions._id });
};

export const removeComponent = async (
  conditions: Partial<Component>
): CommonPromiseAPIResponseType<object> => {
  await updateComponent({ _id: conditions._id, isDeleted: true });
  return {};
};
