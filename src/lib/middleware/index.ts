import * as express from "express";
import { UnknownObject } from "../../lib";
import generateRequest from "./request";
import generateResponse from "./response";

interface RequestIE extends express.Request {
  /**
   * Header의 토큰을 꺼내기 쉽게 정제한다.
   */
  token: string;
  /**
   * Method Type에 상관없이 쉽게 꺼내쓰기 위해 정제한다.
   */
  item: UnknownObject;
}

interface ResponseIE extends express.Response {}

const initMiddleWare = async (
  request: RequestIE,
  response: ResponseIE,
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

export { RequestIE, ResponseIE, initMiddleWare };
