import { RouteItemType } from "@/lib/route/routes";
import * as Style from "@/models/Style/controller";

const rootPath = "/styles";
const StyleRoute: RouteItemType[] = [
  {
    path: `${rootPath}/count`,
    method: "get",
    next: Style.findCount,
    auth: false,
  },
  {
    path: `${rootPath}/:_id`,
    method: "get",
    next: Style.findOne,
    auth: false,
  },
  {
    path: rootPath,
    method: "get",
    next: Style.find,
    auth: false,
  },
  {
    path: `${rootPath}/:_id`,
    method: "delete",
    next: Style.remove,
    auth: true,
  },
];

export default StyleRoute;
