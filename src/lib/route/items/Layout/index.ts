import { RouteItemType } from "@/lib/route/routes";
import * as Layout from "@/models/Layout/controller";

const rootPath = "/layouts";
const LayoutRoute: RouteItemType[] = [
  {
    path: `${rootPath}/count`,
    method: "get",
    next: Layout.findCount,
    auth: false,
  },
  {
    path: `${rootPath}/:_id`,
    method: "get",
    next: Layout.findOne,
    auth: false,
  },
  {
    path: rootPath,
    method: "get",
    next: Layout.find,
    auth: false,
  },
  {
    path: `${rootPath}/:_id`,
    method: "delete",
    next: Layout.remove,
    auth: true,
  },
];

export default LayoutRoute;
