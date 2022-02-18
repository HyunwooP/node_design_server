import { RequestIE, ResponseIE } from "../../../lib";
import { StyleIE } from "../entity";
import {
  findOneStyle,
  findStyle,
  findStyleCount,
  removeStyle,
  updateStyle,
} from "../service";

/**
 * @description
 * 대표 CRUD를 통해 중복되는 객체 호출을 방지한다.
 * @returns {StyleIE}
 */

/**
 * @method GET
 * @param {RequestIE} request
 * @param {ResponseIE} response
 * @param {Function} next
 * @returns {Promise<String>}
 */
export const findCount = async (
  request: RequestIE,
  response: ResponseIE,
  next: Function
): Promise<String> => {
  return await findStyleCount();
};

/**
 * @method GET
 * @param {RequestIE} request
 * @param {ResponseIE} response
 * @param {Function} next
 * @returns {Promise<StyleIE>}
 */
export const findOne = async (
  request: RequestIE,
  response: ResponseIE,
  next: Function
): Promise<StyleIE> => {
  const conditions: StyleIE = request.item;
  return await findOneStyle(conditions);
};

/**
 * @method GET
 * @param {RequestIE} request
 * @param {ResponseIE} response
 * @param {Function} next
 * @returns {Promise<StyleIE[]>}
 */
export const find = async (
  request: RequestIE,
  response: ResponseIE,
  next: Function
): Promise<[StyleIE[], number]> => {
  const conditions: StyleIE = request.item;
  return await findStyle(conditions);
};

/**
 * @method POST
 * @param {RequestIE} request
 * @param {ResponseIE} response
 * @param {Function} next
 * @returns {Promise<StyleIE>}
 */
export const update = async (
  request: RequestIE,
  response: ResponseIE,
  next: Function
): Promise<StyleIE> => {
  const conditions: StyleIE = request.item;
  return await updateStyle(conditions);
};

/**
 * @method DELETE
 * @param {RequestIE} request
 * @param {ResponseIE} response
 * @param {Function} next
 * @returns {Promise<object>}
 */
export const remove = async (
  request: RequestIE,
  response: ResponseIE,
  next: Function
): Promise<object> => {
  const conditions: StyleIE = request.item;
  return await removeStyle(conditions);
};
