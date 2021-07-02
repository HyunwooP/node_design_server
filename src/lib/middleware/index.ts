import * as express from "express";
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
  item: any;
}

interface ResponseIE extends express.Response {}

const initMiddleWare = async (
  req: RequestIE,
  res: ResponseIE,
  next: Function
): Promise<void> => {
  try {
    await generateRequest(req);
    await generateResponse(res);
    next();
  } catch (e) {
    console.log("initMiddleWare Error", e);
  }
};

export {
  // COMMON
  RequestIE,
  ResponseIE,
  initMiddleWare,
};
