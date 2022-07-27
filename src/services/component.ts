import { Component } from "@/entities/Component";
import {
  CommonPromiseAPIResponse,
  CommonStatusCode,
  CommonStatusMessage,
} from "@/lib";
import AppRepository from "@/repository";
import { Query, Sort } from "@/types/common";
import { ComponentRequest } from "@/types/component";
import { onFailureHandler } from "@/utils";
import _ from "lodash";

export const findComponentCount =
  async (): CommonPromiseAPIResponse<number> => {
    return await AppRepository.Component.count();
  };

export const findOneComponent = async (
  conditions: Partial<ComponentRequest>
): CommonPromiseAPIResponse<Component> => {
  return await AppRepository.Component.findOne({ ...conditions });
};

export const findComponent = async (
  conditions: Partial<ComponentRequest>
): CommonPromiseAPIResponse<[Component[], number]> => {
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

  return await AppRepository.Component.findAndCount({
    ...conditions,
    ...query,
  });
};

export const createComponent = async (
  conditions: Component
): CommonPromiseAPIResponse<Component> => {
  return await AppRepository.Component.create(conditions);
};

export const updateComponent = async (
  conditions: Partial<Component>
): CommonPromiseAPIResponse<Component> => {
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
): CommonPromiseAPIResponse<object> => {
  await updateComponent({ _id: conditions._id, isDeleted: true });
  return {};
};
