import { RouteItemIE } from "lib/route/routes";
import * as Style from "../../../../models/Style/controller";

const StyleRoute: RouteItemIE[] = [
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
];

export default StyleRoute;
