import { RequestIE, ResponseIE } from "../../../lib";
import { Theme } from "../entity";
import {
  findOneTheme,
  findTheme,
  findThemeCount,
  findThemeItem,
  removeTheme,
  updateTheme
} from "../service";
import { ThemeRequestType } from "../type";

/**
 * @description
 * 대표 CRUD를 통해 중복되는 객체 호출을 방지한다.
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
 * @returns {Promise<Theme>}
 */
export const findItem = async (
  request: RequestIE,
  response: ResponseIE,
  next: Function
): Promise<Theme> => {
  return await findThemeItem();
};

/**
 * @method GET
 * @param {RequestIE} request
 * @param {ResponseIE} response
 * @param {Function} next
 * @returns {Promise<Theme>}
 */
export const findOne = async (
  request: RequestIE,
  response: ResponseIE,
  next: Function
): Promise<Theme> => {
  const conditions = request.item as ThemeRequestType;
  return await findOneTheme(conditions);
};

/**
 * @method GET
 * @param {RequestIE} request
 * @param {ResponseIE} response
 * @param {Function} next
 * @returns {Promise<Theme[], number>}
 */
export const find = async (
  request: RequestIE,
  response: ResponseIE,
  next: Function
): Promise<[Theme[], number]> => {
  const conditions = request.item as ThemeRequestType;
  return await findTheme(conditions);
};

/**
 * @method POST
 * @param {RequestIE} request
 * @param {ResponseIE} response
 * @param {Function} next
 * @returns {Promise<Theme>}
 */
export const update = async (
  request: RequestIE,
  response: ResponseIE,
  next: Function
): Promise<Theme> => {
  const conditions = request.item as Theme;
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
  const conditions = request.item as Theme;
  return await removeTheme(conditions);
};
