import { Style } from "@/entities/Style";
import {
  CommonPromiseAPIResponse,
  CommonStatusCode,
  CommonStatusMessage,
} from "@/lib";
import AppRepository from "@/repository";
import { Query, Sort } from "@/types/common";
import { StyleRequest } from "@/types/style";
import { onFailureHandler } from "@/utils";
import _ from "lodash";

export const findStyleCount = async (): CommonPromiseAPIResponse<number> => {
  return await AppRepository.Style.count();
};

export const findOneStyle = async (
  conditions: Partial<StyleRequest>
): CommonPromiseAPIResponse<Style> => {
  return await AppRepository.Style.findOne({ ...conditions });
};

export const findStyle = async (
  conditions: Partial<StyleRequest>
): CommonPromiseAPIResponse<[Style[], number]> => {
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

  return await AppRepository.Style.findAndCount({
    ...conditions,
    ...query,
  });
};

export const createStyle = async (
  conditions: Style
): CommonPromiseAPIResponse<Style> => {
  return await AppRepository.Style.create(conditions);
};

export const updateStyle = async (
  conditions: Partial<Style>
): CommonPromiseAPIResponse<Style> => {
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
): CommonPromiseAPIResponse<object> => {
  await updateStyle({ _id: conditions._id, isDeleted: true });
  return {};
};
