import { IRequest, IResponse } from "../../../lib";
import { Layout } from "../entity";
import {
  findLayout,
  findLayoutCount,
  findOneLayout,
  removeLayout,
  updateLayout
} from "../service";
import { LayoutRequestType } from "../type";

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
  return await findLayoutCount();
};

/**
 * @method GET
 * @param {IRequest} request
 * @param {IResponse} response
 * @param {Function} next
 * @returns {Promise<Layout>}
 */
export const findOne = async (
  request: IRequest,
  response: IResponse,
  next: Function
): Promise<Layout> => {
  const conditions = request.item as LayoutRequestType;
  return await findOneLayout(conditions);
};

/**
 * @method GET
 * @param {IRequest} request
 * @param {IResponse} response
 * @param {Function} next
 * @returns {Promise<[Layout[], number]>}
 */
export const find = async (
  request: IRequest,
  response: IResponse,
  next: Function
): Promise<[Layout[], number]> => {
  const conditions = request.item as LayoutRequestType;
  return await findLayout(conditions);
};

/**
 * @method POST
 * @param {IRequest} request
 * @param {IResponse} response
 * @param {Function} next
 * @returns {Promise<Layout>}
 */
export const update = async (
  request: IRequest,
  response: IResponse,
  next: Function
): Promise<Layout> => {
  const conditions = request.item as Layout;
  return await updateLayout(conditions);
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
  const conditions = request.item as Layout;
  return await removeLayout(conditions);
};
