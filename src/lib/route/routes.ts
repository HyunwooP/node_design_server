import CommonRoute from "./items/Common";
import ComponentRoute from "./items/Component";
import LayoutRoute from "./items/Layout";
import StyleRoute from "./items/Style";
import ThemeRoute from "./items/Theme";

export type RouteItemType = {
  path: string;
  method: "get" | "post" | "put" | "delete" | "patch";
  next: Function;
  auth: boolean;
};

const item: RouteItemType[] = [
  ...CommonRoute,
  ...ComponentRoute,
  ...LayoutRoute,
  ...StyleRoute,
  ...ThemeRoute,
];

export default item;
