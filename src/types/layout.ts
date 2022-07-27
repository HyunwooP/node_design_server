import { Layout } from "@/entities/Layout";
import { CommonRequest, Sort } from "./common";

type LayoutRequestSubOption = {
  nameSort: Sort;
};

export type LayoutRequest = LayoutRequestSubOption &
  CommonRequest &
  Layout;
