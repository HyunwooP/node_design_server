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

/**
 * @description
 * 대표 CRUD를 통해 중복되는 객체 호출을 방지한다.
 */

/**
 * @method GET
 * @param {IRequest} request
 * @param {IResponse} response
 * @returns {CommonPromiseAPIResponseType<number>}
 */
export const findCount = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<number> => {
  return await findLayoutCount();
};

/**
 * @method GET
 * @param {IRequest} request
 * @param {IResponse} response
 * @returns {CommonPromiseAPIResponseType<Layout>}
 */
export const findOne = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<Layout> => {
  const conditions = request.item as LayoutRequestType;
  return await findOneLayout(conditions);
};

/**
 * @method GET
 * @param {IRequest} request
 * @param {IResponse} response
 * @returns {CommonPromiseAPIResponseType<[Layout[], number]>}
 */
export const find = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<[Layout[], number]> => {
  const conditions = request.item as LayoutRequestType;
  return await findLayout(conditions);
};

/**
 * @method POST
 * @param {IRequest} request
 * @param {IResponse} response
 * @returns {CommonPromiseAPIResponseType<Layout>}
 */
export const update = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<Layout> => {
  const conditions = request.item as Layout;
  return await updateLayout(conditions);
};

/**
 * @method DELETE
 * @param {IRequest} request
 * @param {IResponse} response
 * @returns {CommonPromiseAPIResponseType<object>}
 */
export const remove = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<object> => {
  const conditions = request.item as Layout;
  return await removeLayout(conditions);
};
