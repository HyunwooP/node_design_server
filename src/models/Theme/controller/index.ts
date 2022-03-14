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
 * @returns {CommonPromiseAPIResponseType<number>}
 */
export const findCount = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<number> => {
  return await findThemeCount();
};

/**
 * @method GET
 * @param {IRequest} request
 * @param {IResponse} response
 * @returns {CommonPromiseAPIResponseType<Theme>}
 */
export const findItem = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<Theme> => {
  return await findThemeItem();
};

/**
 * @method GET
 * @param {IRequest} request
 * @param {IResponse} response
 * @returns {CommonPromiseAPIResponseType<Theme>}
 */
export const findOne = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<Theme> => {
  const conditions = request.item as ThemeRequestType;
  return await findOneTheme(conditions);
};

/**
 * @method GET
 * @param {IRequest} request
 * @param {IResponse} response
 * @returns {CommonPromiseAPIResponseType<Theme[], number>}
 */
export const find = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<[Theme[], number]> => {
  const conditions = request.item as ThemeRequestType;
  return await findTheme(conditions);
};

/**
 * @method POST
 * @param {IRequest} request
 * @param {IResponse} response
 * @returns {CommonPromiseAPIResponseType<Theme>}
 */
export const update = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<Theme> => {
  const conditions = request.item as Theme;
  return await updateTheme(conditions);
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
  const conditions = request.item as Theme;
  return await removeTheme(conditions);
};
