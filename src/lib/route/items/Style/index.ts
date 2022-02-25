import { RouteItemType } from "lib/route/routes";
import * as Style from "../../../../models/Style/controller";

const StyleRoute: RouteItemType[] = [
  // GET
  {
    path: "/findStyleCount",
    method: "get",
    next: Style.findCount,
    auth: false,
  },
  {
    path: "/findStyle",
    method: "get",
    next: Style.find,
    auth: false,
  },
  // DELETE
  {
    path: "/removeStyle",
    method: "delete",
    next: Style.remove,
    auth: true,
  },
];

export default StyleRoute;
