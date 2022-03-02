import {
  AppRepository,
  CommonStatusCode,
  CommonStatusMessage,
  getErrorItems,
  onFailureHandler
} from "@/lib";
import { CommonPromiseAPIResponseType } from "@/lib/type";
import { QueryType } from "@/models/Common/type";
import { toObjectId } from "@/utils";
import * as _ from "lodash";
import { Style } from "../entity";
import { StyleRequestType } from "../type";

export const findStyleCount = async (): CommonPromiseAPIResponseType<String> => {
  try {
    return String(await AppRepository.Style.count());
  } catch (error: unknown) {
    const _error = getErrorItems(error);

    onFailureHandler({
      status: _error.status,
      message: _error.message,
      data: _error.data,
    });
  }
};

export const findOneStyle = async (
  conditions: Partial<StyleRequestType>
): CommonPromiseAPIResponseType<Style> => {
  try {
    return await AppRepository.Style.findOne({ ...conditions });
  } catch (error: unknown) {
    const _error = getErrorItems(error);

    onFailureHandler({
      status: _error.status,
      message: _error.message,
      data: _error.data,
    });
  }
};

export const findStyle = async (
  conditions: Partial<StyleRequestType>
): CommonPromiseAPIResponseType<[Style[], number]> => {
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

    return await AppRepository.Style.findAndCount({
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

export const createStyle = async (conditions: Style): CommonPromiseAPIResponseType<Style> => {
  try {
    return await AppRepository.Style.create(conditions);
  } catch (error: unknown) {
    const _error = getErrorItems(error);

    onFailureHandler({
      status: _error.status,
      message: _error.message,
      data: _error.data,
    });
  }
};

export const updateStyle = async (
  conditions: Partial<Style>
): CommonPromiseAPIResponseType<Style> => {
  try {
    const style = await findOneStyle({
      _id: toObjectId(conditions._id),
    }) as Style;

    if (_.isUndefined(style)) {
      onFailureHandler({
        status: CommonStatusCode.NOT_FOUND,
        message: CommonStatusMessage.NOT_FOUND,
      });
    }

    // 스타일 이름
    style.name = _.isUndefined(conditions.name) ? style.name : conditions.name;
    // 스타일에 포함된 컴포넌트
    style.components = _.isUndefined(conditions.components)
      ? style.components
      : conditions.components;
    // 스타일에 포함된 레이아웃
    style.layouts = _.isUndefined(conditions.layouts)
      ? style.layouts
      : conditions.layouts;
    // 사용 유무
    style.isActive = _.isUndefined(conditions.isActive)
      ? style.isActive
      : conditions.isActive;
    // 삭제 유무
    style.isDeleted = _.isUndefined(conditions.isDeleted)
      ? style.isDeleted
      : conditions.isDeleted;

    return await AppRepository.Style.save(style);
  } catch (error: unknown) {
    const _error = getErrorItems(error);

    onFailureHandler({
      status: _error.status,
      message: _error.message,
      data: _error.data,
    });
  }
};

export const removeStyle = async (
  conditions: Partial<Style>
): CommonPromiseAPIResponseType<object> => {
  try {
    await updateStyle({ _id: conditions._id, isDeleted: true });
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
