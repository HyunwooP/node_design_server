import { health } from "@/controllers/common";
import { RouteItemType } from "@/lib/route/routes";

const CommonRoute: RouteItemType[] = [
  {
    path: "/designHealth",
    method: "get",
    next: health,
    auth: false,
  },
];

export default CommonRoute;
