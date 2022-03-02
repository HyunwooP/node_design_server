import { IRequest, IResponse } from "@/lib";
import { CommonPromiseAPIResponseType } from "@/lib/type";
import { Theme } from "../entity";
import {
  findOneTheme,
  findTheme,
  findThemeCount,
  findThemeItem,
  removeTheme,
  updateTheme,
} from "../service";
import { ThemeRequestType } from "../type";

/**
 * @description
 * 대표 CRUD를 통해 중복되는 객체 호출을 방지한다.
 */

/**
 * @method GET
 * @param {IRequest} request
 * @param {IResponse} response
 * @param {Function} next
 * @returns {CommonPromiseAPIResponseType<String>}
 */
export const findCount = async (
  request: IRequest,
  response: IResponse,
  next: Function
): CommonPromiseAPIResponseType<String> => {
  return await findThemeCount();
};

/**
 * @method GET
 * @param {IRequest} request
 * @param {IResponse} response
 * @param {Function} next
 * @returns {CommonPromiseAPIResponseType<Theme>}
 */
export const findItem = async (
  request: IRequest,
  response: IResponse,
  next: Function
): CommonPromiseAPIResponseType<Theme> => {
  return await findThemeItem();
};

/**
 * @method GET
 * @param {IRequest} request
 * @param {IResponse} response
 * @param {Function} next
 * @returns {CommonPromiseAPIResponseType<Theme>}
 */
export const findOne = async (
  request: IRequest,
  response: IResponse,
  next: Function
): CommonPromiseAPIResponseType<Theme> => {
  const conditions = request.item as ThemeRequestType;
  return await findOneTheme(conditions);
};

/**
 * @method GET
 * @param {IRequest} request
 * @param {IResponse} response
 * @param {Function} next
 * @returns {CommonPromiseAPIResponseType<Theme[], number>}
 */
export const find = async (
  request: IRequest,
  response: IResponse,
  next: Function
): CommonPromiseAPIResponseType<[Theme[], number]> => {
  const conditions = request.item as ThemeRequestType;
  return await findTheme(conditions);
};

/**
 * @method POST
 * @param {IRequest} request
 * @param {IResponse} response
 * @param {Function} next
 * @returns {CommonPromiseAPIResponseType<Theme>}
 */
export const update = async (
  request: IRequest,
  response: IResponse,
  next: Function
): CommonPromiseAPIResponseType<Theme> => {
  const conditions = request.item as Theme;
  return await updateTheme(conditions);
};

/**
 * @method DELETE
 * @param {IRequest} request
 * @param {IResponse} response
 * @param {Function} next
 * @returns {CommonPromiseAPIResponseType<object>}
 */
export const remove = async (
  request: IRequest,
  response: IResponse,
  next: Function
): CommonPromiseAPIResponseType<object> => {
  const conditions = request.item as Theme;
  return await removeTheme(conditions);
};
