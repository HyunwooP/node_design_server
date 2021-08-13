import { RequestIE, ResponseIE } from "../../../lib";
import {
  findComponent,
  findComponentCount,
  findOneComponent,
  removeComponent,
  updateComponent,
} from "../service";
import { ComponentIE } from "../entity";

/**
 * @description
 * 대표 CRUD를 통해 중복되는 객체 호출을 방지한다.
 * @returns {ComponentIE}
 */

/**
 * @method GET
 * @param {RequestIE} req
 * @param {ResponseIE} res
 * @param {Function} next
 * @returns {Promise<String>}
 */
export const findCount = async (
  req: RequestIE,
  res: ResponseIE,
  next: Function
): Promise<String> => {
  return await findComponentCount();
};

/**
 * @method GET
 * @param {RequestIE} req
 * @param {ResponseIE} res
 * @param {Function} next
 * @returns {Promise<ComponentIE>}
 */
export const findOne = async (
  req: RequestIE,
  res: ResponseIE,
  next: Function
): Promise<ComponentIE> => {
  const conditions: ComponentIE = req.item;
  return await findOneComponent(conditions);
};

/**
 * @method GET
 * @param {RequestIE} req
 * @param {ResponseIE} res
 * @param {Function} next
 * @returns {Promise<[ComponentIE[], number]>}
 */
export const find = async (
  req: RequestIE,
  res: ResponseIE,
  next: Function
): Promise<[ComponentIE[], number]> => {
  const conditions: ComponentIE = req.item;
  return await findComponent(conditions);
};

/**
 * @method POST
 * @param {RequestIE} req
 * @param {ResponseIE} res
 * @param {Function} next
 * @returns {Promise<ComponentIE>}
 */
export const update = async (
  req: RequestIE,
  res: ResponseIE,
  next: Function
): Promise<ComponentIE> => {
  const conditions: ComponentIE = req.item;
  return await updateComponent(conditions);
};

/**
 * @method DELETE
 * @param {RequestIE} req
 * @param {ResponseIE} res
 * @param {Function} next
 * @returns {Promise<object>}
 */
export const remove = async (
  req: RequestIE,
  res: ResponseIE,
  next: Function
): Promise<object> => {
  const conditions: ComponentIE = req.item;
  return await removeComponent(conditions);
};
