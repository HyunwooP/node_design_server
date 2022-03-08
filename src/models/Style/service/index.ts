import { AppRepository, getErrorItems, onFailureHandler } from "@/lib";
import { CommonPromiseAPIResponseType } from "@/lib/type";
import { QueryType } from "@/models/Common/type";
import { toObjectId } from "@/utils";
import * as _ from "lodash";
import { Style } from "../entity";
import { StyleRequestType } from "../type";

export const findStyleCount =
  async (): CommonPromiseAPIResponseType<number> => {
    try {
      return await AppRepository.Style.count();
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

export const createStyle = async (
  conditions: Style
): CommonPromiseAPIResponseType<Style> => {
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
    await AppRepository.Style.update(
      { _id: toObjectId(conditions._id) },
      conditions
    );
    return findOneStyle({ _id: toObjectId(conditions._id) });
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
