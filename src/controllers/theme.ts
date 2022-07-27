import { Theme } from "@/entities/Theme";
import { CommonPromiseAPIResponse, IRequest, IResponse } from "@/lib";
import {
  findOneTheme,
  findTheme,
  findThemeCount,
  findThemeItem,
  removeTheme,
  updateTheme,
} from "@/services/theme";
import { ThemeRequest } from "@/types/theme";

export const findCount = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponse<number> => {
  return await findThemeCount();
};

export const findItem = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponse<Theme> => {
  return await findThemeItem();
};

export const findOne = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponse<Theme> => {
  const conditions = request.item as ThemeRequest;
  return await findOneTheme(conditions);
};

export const find = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponse<[Theme[], number]> => {
  const conditions = request.item as ThemeRequest;
  return await findTheme(conditions);
};

export const update = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponse<Theme> => {
  const conditions = request.item as Theme;
  return await updateTheme(conditions);
};

export const remove = async (
  request: IRequest,
  response: IResponse
): CommonPromiseAPIResponse<object> => {
  const conditions = request.item as Theme;
  return await removeTheme(conditions);
};
