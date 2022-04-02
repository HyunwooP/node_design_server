import { RouteItemType } from "@/lib/route/routes";
import * as Theme from "@/models/Theme/controller";

const rootPath = "/themes";
const ThemeRoute: RouteItemType[] = [
  {
    path: `${rootPath}/count`,
    method: "get",
    next: Theme.findCount,
    auth: false,
  },
  {
    path: `${rootPath}/themeItem`,
    method: "get",
    next: Theme.findItem,
    auth: false,
  },
  {
    path: `${rootPath}/:themeId`,
    method: "get",
    next: Theme.findOne,
    auth: false,
  },
  {
    path: rootPath,
    method: "get",
    next: Theme.find,
    auth: false,
  },
  {
    path: `${rootPath}/:themeId`,
    method: "delete",
    next: Theme.remove,
    auth: true,
  },
];

export default ThemeRoute;
