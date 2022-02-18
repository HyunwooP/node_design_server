import { CommonStatusCode, CommonStatusMessage } from "./status";
import { UnknownObject } from "./type";

type HandlerParams = {
  status: number;
  message: string;
  data?: UnknownObject;
};

export const onFailureHandler = ({
  status = CommonStatusCode.INTERNAL_SERVER_ERROR,
  message = CommonStatusMessage.INTERNAL_SERVER_ERROR,
  data = {},
}: HandlerParams): HandlerParams => {
  throw {
    status,
    message,
    data,
  };
};

export const getErrorItems = (error: unknown): HandlerParams => {
  const item = {} as HandlerParams;

  if (typeof error === "string") {
    item.status = 500;
    item.message = error;
  } else if (error instanceof Error) {
    item.status = 500;
    item.message = error.message;
  } else {
    const _error = error as HandlerParams;

    item.status = _error.status;
    item.message = _error.message;
    item.data = _error.data;
  }

  return item;
};
