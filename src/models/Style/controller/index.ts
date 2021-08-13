import { RequestIE, ResponseIE } from "../../../lib";
import {
  findStyle,
  findOneStyle,
  removeStyle,
  updateStyle,
  findStyleCount,
} from "../service";
import { StyleIE } from "../entity";

/**
 * @description
 * 대표 CRUD를 통해 중복되는 객체 호출을 방지한다.
 * @returns {StyleIE}
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
  return await findStyleCount();
};

/**
 * @method GET
 * @param {RequestIE} req
 * @param {ResponseIE} res
 * @param {Function} next
 * @returns {Promise<StyleIE>}
 */
export const findOne = async (
  req: RequestIE,
  res: ResponseIE,
  next: Function
): Promise<StyleIE> => {
  const conditions: StyleIE = req.item;
  return await findOneStyle(conditions);
};

/**
 * @method GET
 * @param {RequestIE} req
 * @param {ResponseIE} res
 * @param {Function} next
 * @returns {Promise<StyleIE[]>}
 */
export const find = async (
  req: RequestIE,
  res: ResponseIE,
  next: Function
): Promise<[StyleIE[], number]> => {
  const conditions: StyleIE = req.item;
  return await findStyle(conditions);
};

/**
 * @method POST
 * @param {RequestIE} req
 * @param {ResponseIE} res
 * @param {Function} next
 * @returns {Promise<StyleIE>}
 */
export const update = async (
  req: RequestIE,
  res: ResponseIE,
  next: Function
): Promise<StyleIE> => {
  const conditions: StyleIE = req.item;
  return await updateStyle(conditions);
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
  const conditions: StyleIE = req.item;
  return await removeStyle(conditions);
};
