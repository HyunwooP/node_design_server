import { IRequest, IResponse } from "../../../lib";
import { Component } from "../entity";
import {
  findComponent,
  findComponentCount,
  findOneComponent,
  removeComponent,
  updateComponent
} from "../service";
import { ComponentRequestType } from "../type";

/**
 * @description
 * 대표 CRUD를 통해 중복되는 객체 호출을 방지한다.
 */

/**
 * @method GET
 * @param {IRequest} request
 * @param {IResponse} response
 * @param {Function} next
 * @returns {Promise<String>}
 */
export const findCount = async (
  request: IRequest,
  response: IResponse,
  next: Function
): Promise<String> => {
  return await findComponentCount();
};

/**
 * @method GET
 * @param {IRequest} request
 * @param {IResponse} response
 * @param {Function} next
 * @returns {Promise<Component>}
 */
export const findOne = async (
  request: IRequest,
  response: IResponse,
  next: Function
): Promise<Component> => {
  const conditions = request.item as ComponentRequestType;
  return await findOneComponent(conditions);
};

/**
 * @method GET
 * @param {IRequest} request
 * @param {IResponse} response
 * @param {Function} next
 * @returns {Promise<[Component[], number]>}
 */
export const find = async (
  request: IRequest,
  response: IResponse,
  next: Function
): Promise<[Component[], number]> => {
  const conditions = request.item as ComponentRequestType;
  return await findComponent(conditions);
};

/**
 * @method POST
 * @param {IRequest} request
 * @param {IResponse} response
 * @param {Function} next
 * @returns {Promise<Component>}
 */
export const update = async (
  request: IRequest,
  response: IResponse,
  next: Function
): Promise<Component> => {
  const conditions = request.item as Component;
  return await updateComponent(conditions);
};

/**
 * @method DELETE
 * @param {IRequest} request
 * @param {IResponse} response
 * @param {Function} next
 * @returns {Promise<object>}
 */
export const remove = async (
  request: IRequest,
  response: IResponse,
  next: Function
): Promise<object> => {
  const conditions = request.item as Component;
  return await removeComponent(conditions);
};
