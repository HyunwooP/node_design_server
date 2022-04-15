import { IRequest, IResponse } from "@/lib";
import { CommonPromiseAPIResponseType } from "@/lib/type";
import { Style } from "../entity";
import {
  findOneStyle,
  findStyle,
  findStyleCount,
  removeStyle,
  updateStyle,
} from "../service";
import { StyleRequestType } from "../type";

export const findCount = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<number> => {
  return await findStyleCount();
};

export const findOne = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<Style> => {
  const conditions = request.item as StyleRequestType;
  return await findOneStyle(conditions);
};

export const find = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<[Style[], number]> => {
  const conditions = request.item as StyleRequestType;
  return await findStyle(conditions);
};

export const update = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<Style> => {
  const conditions = request.item as Style;
  return await updateStyle(conditions);
};

export const remove = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<object> => {
  const conditions = request.item as Style;
  return await removeStyle(conditions);
};
