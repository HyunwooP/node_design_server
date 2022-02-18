import * as _ from "lodash";
import { RequestIE } from ".";
import { UnknownObject } from "../../lib";

export default (req: RequestIE): void => {
  Promise.all([createToken(req), createItem(req)]).catch((e) =>
    console.log("Generate Middleware Failed", e)
  );
};

const createItem = (req: RequestIE): void => {
  switch (req.method) {
    case "GET":
    case "DELETE":
      const query: UnknownObject = { ...req.query };

      // Mysql과 다르게 Mongo는 take, skip을 number타입으로 무조건 제공해야함.
      if (!_.isEmpty(query.take)) query.take = Number(query.take);

      if (!_.isEmpty(query.skip)) query.skip = Number(query.skip);

      req.item = query;
      break;
    case "POST":
    case "PUT":
    case "PATCH":
      const body: UnknownObject = { ...req.body };
      req.item = body;
      break;
  }
};

const createToken = (req: RequestIE): void => {
  const token =
    !_.isEmpty(req.headers.authorization) &&
    req.headers.authorization.replace("Bearer ", "");

  req.token = token ?? "";
};
