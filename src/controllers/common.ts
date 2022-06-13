import { IRequest, IResponse } from "@/lib";
import { CommonAPIResponseType } from "@/lib/type";
import { _health } from "@/services/common";
import { HandlerParamsType } from "@/utils";

export const health = (
  request: IRequest,
  response: IResponse
): CommonAPIResponseType<HandlerParamsType> => {
  return _health();
};
