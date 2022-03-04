import { Request, Response } from "express";
import { getErrorItems } from "..";
import generateRequest from "./request";
import generateResponse from "./response";

type ClientRequestItemType = {
  /**
   * Method Type에 상관없이 쉽게 꺼내쓰기 위해 정제한다.
   */
  item: unknown;
};

interface IRequest extends Request, Partial<ClientRequestItemType> {}

interface IResponse extends Response {}

const initMiddleWare = async (
  request: IRequest,
  response: IResponse,
  next: Function
): Promise<void> => {
  try {
    await generateRequest(request);
    await generateResponse(response);
    
    next();
  } catch (error: unknown) {
    const _error = getErrorItems(error);

    response.status(_error.status);
    response.send(_error);
  }
};

export { IRequest, IResponse, initMiddleWare };
