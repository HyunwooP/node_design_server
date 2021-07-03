import * as Common from "../../models/Common/controller";
import * as Theme from "../../models/Theme/controller";

export interface RouteItemIE {
  path: string;
  method: "get" | "post" | "put" | "delete" | "patch";
  next: Function;
  auth: boolean;
}

const item: RouteItemIE[] = [
  // GET
  {
    path: "/health",
    method: "get",
    next: Common.health,
    auth: false,
  },
  {
    path: "/findTheme",
    method: "get",
    next: Theme.findItem,
    auth: false,
  },
];

export default item;
