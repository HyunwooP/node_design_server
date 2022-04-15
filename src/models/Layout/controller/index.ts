import { IRequest, IResponse } from "@/lib";
import { CommonPromiseAPIResponseType } from "@/lib/type";
import { Layout } from "../entity";
import {
  findLayout,
  findLayoutCount,
  findOneLayout,
  removeLayout,
  updateLayout,
} from "../service";
import { LayoutRequestType } from "../type";

export const findCount = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<number> => {
  return await findLayoutCount();
};

export const findOne = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<Layout> => {
  const conditions = request.item as LayoutRequestType;
  return await findOneLayout(conditions);
};

export const find = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<[Layout[], number]> => {
  const conditions = request.item as LayoutRequestType;
  return await findLayout(conditions);
};

export const update = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<Layout> => {
  const conditions = request.item as Layout;
  return await updateLayout(conditions);
};

export const remove = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<object> => {
  const conditions = request.item as Layout;
  return await removeLayout(conditions);
};
