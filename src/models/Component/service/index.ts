import {
  AppRepository,
  CommonStatusCode,
  CommonStatusMessage,
  getErrorItems,
  onFailureHandler,
} from "@/lib";
import { QueryType } from "@/models/Common/type";
import { toObjectId } from "@/utils";
import * as _ from "lodash";
import { Component } from "../entity";
import { ComponentRequestType } from "../type";

export const findComponentCount = async (): Promise<String> => {
  try {
    return String(await AppRepository.Component.count());
  } catch (error: unknown) {
    const _error = getErrorItems(error);

    onFailureHandler({
      status: _error.status,
      message: _error.message,
      data: _error.data,
    });
  }
};

export const findOneComponent = async (
  conditions: Partial<ComponentRequestType>
): Promise<Component> => {
  try {
    return await AppRepository.Component.findOne({ ...conditions });
  } catch (error: unknown) {
    const _error = getErrorItems(error);

    onFailureHandler({
      status: _error.status,
      message: _error.message,
      data: _error.data,
    });
  }
};

export const findComponent = async (
  conditions: Partial<ComponentRequestType>
): Promise<[Component[], number]> => {
  try {
    let query = {} as QueryType;

    if (!_.isEmpty(conditions.searchKeyword)) {
      query.where = {
        name: {
          $regex: conditions.searchKeyword,
          $options: "i",
        },
      };
    }

    if (!_.isEmpty(conditions.nameSort)) {
      query.order.name = conditions.nameSort;
    }

    return await AppRepository.Component.findAndCount({
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

export const createComponent = async (
  conditions: Component
): Promise<Component> => {
  try {
    return await AppRepository.Component.create(conditions);
  } catch (error: unknown) {
    const _error = getErrorItems(error);

    onFailureHandler({
      status: _error.status,
      message: _error.message,
      data: _error.data,
    });
  }
};

export const updateComponent = async (
  conditions: Partial<Component>
): Promise<Component> => {
  try {
    const component = await findOneComponent({
      _id: toObjectId(conditions._id),
    });

    if (_.isUndefined(component)) {
      onFailureHandler({
        status: CommonStatusCode.NOT_FOUND,
        message: CommonStatusMessage.NOT_FOUND,
      });
    }

    // 컴포넌트 이름
    component.name = _.isUndefined(conditions.name)
      ? component.name
      : conditions.name;
    // 컴포넌트 CSS 속성
    component.attribute = _.isUndefined(conditions.attribute)
      ? component.attribute
      : conditions.attribute;
    // 삭제 유무
    component.isDeleted = _.isUndefined(conditions.isDeleted)
      ? component.isDeleted
      : conditions.isDeleted;

    return await AppRepository.Component.save(component);
  } catch (error: unknown) {
    const _error = getErrorItems(error);

    onFailureHandler({
      status: _error.status,
      message: _error.message,
      data: _error.data,
    });
  }
};

export const removeComponent = async (
  conditions: Partial<Component>
): Promise<object> => {
  try {
    await updateComponent({ _id: conditions._id, isDeleted: true });
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
