import { RouteItemIE } from "lib/route/routes";
import * as Layout from "../../../../models/Layout/controller";

const LayoutRoute: RouteItemIE[] = [
  // GET
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
];

export default LayoutRoute;
