import { RequestIE, ResponseIE } from "../../../lib";
import {
  findTheme,
  findOneTheme,
  removeTheme,
  updateTheme,
  findThemeItem,
} from "../service";
import { ThemeIE } from "../entity";

/**
 * @description
 * 대표 CRUD를 통해 중복되는 객체 호출을 방지한다.
 * @returns {ThemeIE}
 */

/**
 * @method GET
 * @param {RequestIE} req
 * @param {ResponseIE} res
 * @param {Function} next
 * @returns {Promise<ThemeIE>}
 */
export const findItem = async (
  req: RequestIE,
  res: ResponseIE,
  next: Function
): Promise<ThemeIE> => {
  return await findThemeItem();
};

/**
 * @method GET
 * @param {RequestIE} req
 * @param {ResponseIE} res
 * @param {Function} next
 * @returns {Promise<ThemeIE>}
 */
export const findOne = async (
  req: RequestIE,
  res: ResponseIE,
  next: Function
): Promise<ThemeIE> => {
  const conditions: ThemeIE = req.item;
  return await findOneTheme(conditions);
};

/**
 * @method GET
 * @param {RequestIE} req
 * @param {ResponseIE} res
 * @param {Function} next
 * @returns {Promise<ThemeIE[]>}
 */
export const find = async (
  req: RequestIE,
  res: ResponseIE,
  next: Function
): Promise<ThemeIE[]> => {
  const conditions: ThemeIE = req.item;
  return await findTheme(conditions);
};

/**
 * @method POST
 * @param {RequestIE} req
 * @param {ResponseIE} res
 * @param {Function} next
 * @returns {Promise<ThemeIE>}
 */
export const update = async (
  req: RequestIE,
  res: ResponseIE,
  next: Function
): Promise<ThemeIE> => {
  const conditions: ThemeIE = req.item;
  return await updateTheme(conditions);
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
  const conditions: ThemeIE = req.item;
  return await removeTheme(conditions);
};
