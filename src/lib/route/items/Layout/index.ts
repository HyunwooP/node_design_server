import { RouteItemType } from "@/lib/route/routes";
import * as Layout from "@/models/Layout/controller";

const LayoutRoute: RouteItemType[] = [
  {
    path: "/findLayoutCount",
    method: "get",
    next: Layout.findCount,
    auth: false,
  },
  {
    path: "/findLayout",
    method: "get",
    next: Layout.find,
    auth: false,
  },
  {
    path: "/removeLayout",
    method: "delete",
    next: Layout.remove,
    auth: true,
  },
];

export default LayoutRoute;
