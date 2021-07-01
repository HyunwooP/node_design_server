import { RequestIE, ResponseIE } from "../../../lib";
import { _health } from "../service";

/**
 * @method GET
 * @param {RequestIE} req
 * @param {ResponseIE} res
 * @param {Function} next
 * @returns {Promise<object>}
 */
export const health = async (
  req: RequestIE,
  res: ResponseIE,
  next: Function
): Promise<object> => {
  return await _health();
};
