import { RouteItemIE } from "lib/route/routes";
import * as Theme from "../../../../models/Theme/controller";

const ThemeRoute: RouteItemIE[] = [
  // GET
  {
    path: "/findThemeCount",
    method: "get",
    next: Theme.findCount,
    auth: false,
  },
  {
    path: "/findThemeItem",
    method: "get",
    next: Theme.findItem,
    auth: false,
  },
  {
    path: "/findTheme",
    method: "get",
    next: Theme.find,
    auth: false,
  },
  // DELETE
  {
    path: "/removeTheme",
    method: "delete",
    next: Theme.remove,
    auth: true,
  },
];

export default ThemeRoute;
