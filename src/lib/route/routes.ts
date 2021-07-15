import CommonRoute from "./items/Common";
import ComponentRoute from "./items/Component";
import LayoutRoute from "./items/Layout";
import StyleRoute from "./items/Style";
import ThemeRoute from "./items/Theme";

export interface RouteItemIE {
  path: string;
  method: "get" | "post" | "put" | "delete" | "patch";
  next: Function;
  auth: boolean;
}

const item: RouteItemIE[] = [
  ...CommonRoute,
  ...ComponentRoute,
  ...LayoutRoute,
  ...StyleRoute,
  ...ThemeRoute,
];

export default item;
