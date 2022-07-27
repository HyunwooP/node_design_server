import { Component } from "@/entities/Component";
import { CommonPromiseAPIResponse, IRequest, IResponse } from "@/lib";
import {
  findComponent,
  findComponentCount,
  findOneComponent,
  removeComponent,
  updateComponent
} from "@/services/component";
import { ComponentRequest } from "@/types/component";

export const findCount = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponse<number> => {
  return await findComponentCount();
};

export const findOne = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponse<Component> => {
  const conditions = request.item as ComponentRequest;
  return await findOneComponent(conditions);
};

export const find = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponse<[Component[], number]> => {
  const conditions = request.item as ComponentRequest;
  return await findComponent(conditions);
};

export const update = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponse<Component> => {
  const conditions = request.item as Component;
  return await updateComponent(conditions);
};

export const remove = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponse<object> => {
  const conditions = request.item as Component;
  return await removeComponent(conditions);
};
