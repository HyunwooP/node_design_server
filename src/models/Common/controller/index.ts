import { IRequest, IResponse } from "@/lib";
import { HandlerParamsType } from "@/lib/function";
import { CommonAPIResponseType } from "@/lib/type";
import { _health } from "../service";

/**
 * @method GET
 * @param {IRequest} request
 * @param {IResponse} response
 * @param {Function} next
 * @returns {CommonAPIResponseType<HandlerParamsType>}
 */
export const health = (
  request: IRequest,
  response: IResponse,
  next: Function
): CommonAPIResponseType<HandlerParamsType> => {
  return _health();
};
