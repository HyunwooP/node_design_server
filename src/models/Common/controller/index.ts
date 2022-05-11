import { IRequest, IResponse } from "@/lib";
import { CommonAPIResponseType } from "@/lib/type";
import { HandlerParamsType } from "@/utils";
import { _health } from "../service";

export const health = (
  request: IRequest,
  response: IResponse
): CommonAPIResponseType<HandlerParamsType> => {
  return _health();
};
