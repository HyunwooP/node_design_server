import * as _ from "lodash";
import { RequestIE } from ".";
import { UnknownObject } from "../../lib";

export default (request: RequestIE): void => {
  Promise.all([createToken(request), createItem(request)]).catch((e) =>
    console.log("Generate Middleware Failed", e)
  );
};

const createItem = (request: RequestIE): void => {
  switch (request.method) {
    case "GET":
    case "DELETE":
      const query: UnknownObject = { ...request.query };

      // Mysql과 다르게 Mongo는 take, skip을 number타입으로 무조건 제공해야함.
      if (!_.isEmpty(query.take)) query.take = Number(query.take);

      if (!_.isEmpty(query.skip)) query.skip = Number(query.skip);

      request.item = query;
      break;
    case "POST":
    case "PUT":
    case "PATCH":
      const body: UnknownObject = { ...request.body };
      request.item = body;
      break;
  }
};

const createToken = (request: RequestIE): void => {
  const token =
    !_.isEmpty(request.headers.authorization) &&
    request.headers.authorization.replace("Bearer ", "");

  request.token = token ?? "";
};
