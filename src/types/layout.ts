import { Layout } from "@/entities/Layout";
import { CommonRequestType, SortType } from "./common";

type LayoutRequestSubOptionType = {
  nameSort: SortType;
};

export type LayoutRequestType = LayoutRequestSubOptionType &
  CommonRequestType &
  Layout;
