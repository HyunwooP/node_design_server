import { find, findCount, findOne, remove } from "@/controllers/layout";
import { RouteItemType } from "@/lib/route/items";

const rootPath = "/layouts";
const LayoutRoute: RouteItemType[] = [
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
