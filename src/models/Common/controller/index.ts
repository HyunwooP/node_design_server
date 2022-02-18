import { RequestIE, ResponseIE } from "../../../lib";
import { _health } from "../service";

/**
 * @method GET
 * @param {RequestIE} request
 * @param {ResponseIE} response
 * @param {Function} next
 * @returns {Promise<object>}
 */
export const health = async (
  request: RequestIE,
  response: ResponseIE,
  next: Function
): Promise<object> => {
  return await _health();
};
