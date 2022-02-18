import { RequestIE, ResponseIE } from "../../../lib";
import { ThemeIE } from "../entity";
import {
  findOneTheme,
  findTheme,
  findThemeCount,
  findThemeItem,
  removeTheme,
  updateTheme,
} from "../service";

/**
 * @description
 * 대표 CRUD를 통해 중복되는 객체 호출을 방지한다.
 * @returns {ThemeIE}
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
  return await findThemeCount();
};

/**
 * @method GET
 * @param {RequestIE} request
 * @param {ResponseIE} response
 * @param {Function} next
 * @returns {Promise<ThemeIE>}
 */
export const findItem = async (
  request: RequestIE,
  response: ResponseIE,
  next: Function
): Promise<ThemeIE> => {
  return await findThemeItem();
};

/**
 * @method GET
 * @param {RequestIE} request
 * @param {ResponseIE} response
 * @param {Function} next
 * @returns {Promise<ThemeIE>}
 */
export const findOne = async (
  request: RequestIE,
  response: ResponseIE,
  next: Function
): Promise<ThemeIE> => {
  const conditions: ThemeIE = request.item;
  return await findOneTheme(conditions);
};

/**
 * @method GET
 * @param {RequestIE} request
 * @param {ResponseIE} response
 * @param {Function} next
 * @returns {Promise<ThemeIE[]>}
 */
export const find = async (
  request: RequestIE,
  response: ResponseIE,
  next: Function
): Promise<[ThemeIE[], number]> => {
  const conditions: ThemeIE = request.item;
  return await findTheme(conditions);
};

/**
 * @method POST
 * @param {RequestIE} request
 * @param {ResponseIE} response
 * @param {Function} next
 * @returns {Promise<ThemeIE>}
 */
export const update = async (
  request: RequestIE,
  response: ResponseIE,
  next: Function
): Promise<ThemeIE> => {
  const conditions: ThemeIE = request.item;
  return await updateTheme(conditions);
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
  const conditions: ThemeIE = request.item;
  return await removeTheme(conditions);
};
