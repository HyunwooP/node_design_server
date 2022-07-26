import { Style } from "@/entities/Style";
import { CommonStatusCode, CommonStatusMessage } from "@/lib";
import { CommonPromiseAPIResponseType } from "@/lib/type";
import AppRepository from "@/repository";
import { QueryType, SortType } from "@/types/common";
import { StyleRequestType } from "@/types/style";
import { onFailureHandler } from "@/utils";
import _ from "lodash";

export const findStyleCount =
  async (): CommonPromiseAPIResponseType<number> => {
    return await AppRepository.Style.count();
  };

export const findOneStyle = async (
  conditions: Partial<StyleRequestType>
): CommonPromiseAPIResponseType<Style> => {
  return await AppRepository.Style.findOne({ ...conditions });
};

export const findStyle = async (
  conditions: Partial<StyleRequestType>
): CommonPromiseAPIResponseType<[Style[], number]> => {
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

  return await AppRepository.Style.findAndCount({
    ...conditions,
    ...query,
  });
};

export const createStyle = async (
  conditions: Style
): CommonPromiseAPIResponseType<Style> => {
  return await AppRepository.Style.create(conditions);
};

export const updateStyle = async (
  conditions: Partial<Style>
): CommonPromiseAPIResponseType<Style> => {
  if (_.isUndefined(conditions._id)) {
    onFailureHandler({
      status: CommonStatusCode.BAD_REQUEST,
      message: CommonStatusMessage.BAD_REQUEST,
    });
  }

  await AppRepository.Style.update({ _id: conditions._id }, conditions);
  return findOneStyle({ _id: conditions._id });
};

export const removeStyle = async (
  conditions: Partial<Style>
): CommonPromiseAPIResponseType<object> => {
  await updateStyle({ _id: conditions._id, isDeleted: true });
  return {};
};
