import { CommonRequestType, SortType } from "@/models/Common/type";
import { Layout } from "./entity";

type LayoutRequestSubOptionType = {
  nameSort: SortType;
};

export type LayoutRequestType = LayoutRequestSubOptionType & CommonRequestType & Layout;