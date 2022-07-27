import { health } from "@/controllers/common";
import { RouteItem } from "..";

const CommonRoute: RouteItem[] = [
  {
    path: "/designHealth",
    method: "get",
    next: health,
    auth: false,
  },
];

export default CommonRoute;
