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

export const findCount = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<number> => {
  return await findThemeCount();
};

export const findItem = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<Theme> => {
  return await findThemeItem();
};

export const findOne = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<Theme> => {
  const conditions = request.item as ThemeRequestType;
  return await findOneTheme(conditions);
};

export const find = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<[Theme[], number]> => {
  const conditions = request.item as ThemeRequestType;
  return await findTheme(conditions);
};

export const update = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<Theme> => {
  const conditions = request.item as Theme;
  return await updateTheme(conditions);
};

export const remove = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponseType<object> => {
  const conditions = request.item as Theme;
  return await removeTheme(conditions);
};
