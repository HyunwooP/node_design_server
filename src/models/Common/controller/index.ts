import { IRequest, IResponse } from "@/lib";
import { CommonAPIResponseType } from "@/lib/type";
import { _health } from "../service";

/**
 * @method GET
 * @param {IRequest} request
 * @param {IResponse} response
 * @param {Function} next
 * @returns {CommonAPIResponseType<object>}
 */
export const health = (
  request: IRequest,
  response: IResponse,
  next: Function
): CommonAPIResponseType<object> => {
  return _health();
};
