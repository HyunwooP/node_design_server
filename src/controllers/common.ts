import { CommonAPIResponse, IRequest, IResponse } from "@/lib";
import { _health } from "@/services/common";
import { HandlerParams } from "@/utils";

export const health = (
  request: IRequest,
  response: IResponse
): CommonAPIResponse<HandlerParams> => {
  return _health();
};
