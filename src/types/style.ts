import { Style } from "@/models/Style";
import { CommonRequestType, SortType } from "./common";

type StyleRequestSubOptionType = {
  nameSort: SortType;
};

export type StyleRequestType = StyleRequestSubOptionType &
  CommonRequestType &
  Style;
