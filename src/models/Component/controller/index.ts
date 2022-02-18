import { RequestIE, ResponseIE } from "../../../lib";
import { ComponentIE } from "../entity";
import {
  findComponent,
  findComponentCount,
  findOneComponent,
  removeComponent,
  updateComponent,
} from "../service";

/**
 * @description
 * 대표 CRUD를 통해 중복되는 객체 호출을 방지한다.
 * @returns {ComponentIE}
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
  return await findComponentCount();
};

/**
 * @method GET
 * @param {RequestIE} request
 * @param {ResponseIE} response
 * @param {Function} next
 * @returns {Promise<ComponentIE>}
 */
export const findOne = async (
  request: RequestIE,
  response: ResponseIE,
  next: Function
): Promise<ComponentIE> => {
  const conditions: ComponentIE = request.item;
  return await findOneComponent(conditions);
};

/**
 * @method GET
 * @param {RequestIE} request
 * @param {ResponseIE} response
 * @param {Function} next
 * @returns {Promise<[ComponentIE[], number]>}
 */
export const find = async (
  request: RequestIE,
  response: ResponseIE,
  next: Function
): Promise<[ComponentIE[], number]> => {
  const conditions: ComponentIE = request.item;
  return await findComponent(conditions);
};

/**
 * @method POST
 * @param {RequestIE} request
 * @param {ResponseIE} response
 * @param {Function} next
 * @returns {Promise<ComponentIE>}
 */
export const update = async (
  request: RequestIE,
  response: ResponseIE,
  next: Function
): Promise<ComponentIE> => {
  const conditions: ComponentIE = request.item;
  return await updateComponent(conditions);
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
  const conditions: ComponentIE = request.item;
  return await removeComponent(conditions);
};
