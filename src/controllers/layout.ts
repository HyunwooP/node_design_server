import { Layout } from "@/entities/Layout";
import { CommonPromiseAPIResponse, IRequest, IResponse } from "@/lib";
import {
  findLayout,
  findLayoutCount,
  findOneLayout,
  removeLayout,
  updateLayout
} from "@/services/layout";
import { LayoutRequest } from "@/types/layout";

export const findCount = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponse<number> => {
  return await findLayoutCount();
};

export const findOne = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponse<Layout> => {
  const conditions = request.item as LayoutRequest;
  return await findOneLayout(conditions);
};

export const find = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponse<[Layout[], number]> => {
  const conditions = request.item as LayoutRequest;
  return await findLayout(conditions);
};

export const update = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponse<Layout> => {
  const conditions = request.item as Layout;
  return await updateLayout(conditions);
};

export const remove = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponse<object> => {
  const conditions = request.item as Layout;
  return await removeLayout(conditions);
};
