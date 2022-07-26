import { Component } from "@/entities/Component";
import { IRequest, IResponse } from "@/lib";
import { CommonPromiseAPIResponseType } from "@/lib/type";
import {
  findComponent,
  findComponentCount,
  findOneComponent,
  removeComponent,
  updateComponent
} from "@/services/component";
import { ComponentRequestType } from "@/types/component";

export const findCount = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<number> => {
  return await findComponentCount();
};

export const findOne = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<Component> => {
  const conditions = request.item as ComponentRequestType;
  return await findOneComponent(conditions);
};

export const find = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<[Component[], number]> => {
  const conditions = request.item as ComponentRequestType;
  return await findComponent(conditions);
};

export const update = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<Component> => {
  const conditions = request.item as Component;
  return await updateComponent(conditions);
};

export const remove = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<object> => {
  const conditions = request.item as Component;
  return await removeComponent(conditions);
};
