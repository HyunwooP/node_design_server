import { Style } from "@/entities/Style";
import { CommonPromiseAPIResponse, IRequest, IResponse } from "@/lib";
import {
  findOneStyle,
  findStyle,
  findStyleCount,
  removeStyle,
  updateStyle
} from "@/services/style";
import { StyleRequest } from "@/types/style";

export const findCount = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponse<number> => {
  return await findStyleCount();
};

export const findOne = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponse<Style> => {
  const conditions = request.item as StyleRequest;
  return await findOneStyle(conditions);
};

export const find = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponse<[Style[], number]> => {
  const conditions = request.item as StyleRequest;
  return await findStyle(conditions);
};

export const update = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponse<Style> => {
  const conditions = request.item as Style;
  return await updateStyle(conditions);
};

export const remove = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponse<object> => {
  const conditions = request.item as Style;
  return await removeStyle(conditions);
};
