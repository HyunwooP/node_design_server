import * as express from "express";
import generateRequest from "./request";
import generateResponse from "./response";

interface IRequest extends express.Request {
  /**
   * Header의 토큰을 꺼내기 쉽게 정제한다.
   */
  token: string;
  /**
   * Method Type에 상관없이 쉽게 꺼내쓰기 위해 정제한다.
   */
  item: unknown;
}

interface IResponse extends express.Response {}

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
    console.log("initMiddleWare Error", error);
  }
};

export { IRequest, IResponse, initMiddleWare };
