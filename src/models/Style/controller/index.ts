import { IRequest, IResponse } from "@/lib";
import { Style } from "../entity";
import {
  findOneStyle,
  findStyle,
  findStyleCount,
  removeStyle,
  updateStyle
} from "../service";
import { StyleRequestType } from "../type";

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
  return await findStyleCount();
};

/**
 * @method GET
 * @param {IRequest} request
 * @param {IResponse} response
 * @param {Function} next
 * @returns {Promise<Style>}
 */
export const findOne = async (
  request: IRequest,
  response: IResponse,
  next: Function
): Promise<Style> => {
  const conditions = request.item as StyleRequestType;
  return await findOneStyle(conditions);
};

/**
 * @method GET
 * @param {IRequest} request
 * @param {IResponse} response
 * @param {Function} next
 * @returns {Promise<Style[], number>}
 */
export const find = async (
  request: IRequest,
  response: IResponse,
  next: Function
): Promise<[Style[], number]> => {
  const conditions = request.item as StyleRequestType;
  return await findStyle(conditions);
};

/**
 * @method POST
 * @param {IRequest} request
 * @param {IResponse} response
 * @param {Function} next
 * @returns {Promise<Style>}
 */
export const update = async (
  request: IRequest,
  response: IResponse,
  next: Function
): Promise<Style> => {
  const conditions = request.item as Style;
  return await updateStyle(conditions);
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
  const conditions = request.item as Style;
  return await removeStyle(conditions);
};
