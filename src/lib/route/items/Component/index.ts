import { RouteItemIE } from "lib/route/routes";
import * as Component from "../../../../models/Component/controller";

const ComponentRoute: RouteItemIE[] = [
  // GET
  {
    path: "/findComponentCount",
    method: "get",
    next: Component.findCount,
    auth: false,
  },
  {
    path: "/findComponent",
    method: "get",
    next: Component.find,
    auth: false,
  },
  // DELETE
  {
    path: "/removeComponent",
    method: "delete",
    next: Component.remove,
    auth: true,
  },
];

export default ComponentRoute;
