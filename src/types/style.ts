import { Style } from "@/entities/Style";
import { CommonRequestType, SortType } from "./common";

type StyleRequestSubOptionType = {
  nameSort: SortType;
};

export type StyleRequestType = StyleRequestSubOptionType &
  CommonRequestType &
  Style;
