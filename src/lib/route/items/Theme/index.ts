import {
  find,
  findCount,
  findItem,
  findOne,
  remove
} from "@/controllers/theme";
import { RouteItemType } from "@/lib/route/items";

const rootPath = "/themes";
const ThemeRoute: RouteItemType[] = [
  {
    path: `${rootPath}/count`,
    method: "get",
    next: findCount,
    auth: false,
  },
  {
    path: `${rootPath}/themeItem`,
    method: "get",
    next: findItem,
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

export default ThemeRoute;
