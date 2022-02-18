import { RequestIE, ResponseIE } from "../../../lib";
import { _health } from "../service";

/**
 * @method GET
 * @param {RequestIE} request
 * @param {ResponseIE} response
 * @param {Function} next
 * @returns {object}
 */
export const health = (
  request: RequestIE,
  response: ResponseIE,
  next: Function
): object => {
  return _health();
};
