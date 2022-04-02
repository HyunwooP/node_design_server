import { RouteItemType } from "@/lib/route/routes";
import * as Component from "@/models/Component/controller";

const rootPath = "/components";
const ComponentRoute: RouteItemType[] = [
  {
    path: `${rootPath}/count`,
    method: "get",
    next: Component.findCount,
    auth: false,
  },
  {
    path: `${rootPath}/:componentId`,
    method: "get",
    next: Component.findOne,
    auth: false,
  },
  {
    path: rootPath,
    method: "get",
    next: Component.find,
    auth: false,
  },
  {
    path: `${rootPath}/:componentId`,
    method: "delete",
    next: Component.remove,
    auth: true,
  },
];

export default ComponentRoute;
