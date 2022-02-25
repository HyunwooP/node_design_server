import { IRequest, IResponse } from "@/lib";
import { _health } from "../service";

/**
 * @method GET
 * @param {IRequest} request
 * @param {IResponse} response
 * @param {Function} next
 * @returns {object}
 */
export const health = (
  request: IRequest,
  response: IResponse,
  next: Function
): object => {
  return _health();
};
