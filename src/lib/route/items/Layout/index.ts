import { find, findCount, findOne, remove } from "@/controllers/layout";
import { RouteItem } from "..";

const rootPath = "/layouts";
const LayoutRoute: RouteItem[] = [
  {
    path: `${rootPath}/count`,
    method: "get",
    next: findCount,
    auth: false,
  },
  {
    path: `${rootPath}/:_id`,
    method: "get",
    next: findOne,
    auth: false,
  },
  {
    path: rootPath,
    method: "get",
    next: find,
    auth: false,
  },
  {
    path: `${rootPath}/:_id`,
    method: "delete",
    next: remove,
    auth: true,
  },
];

export default LayoutRoute;
