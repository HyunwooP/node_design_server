import { CommonRequestType, SortType } from "@/models/Common/type";
import { Theme } from "./entity";

type ThemeRequestSubOptionType = {
  nameSort: SortType;
};

export type ThemeRequestType = ThemeRequestSubOptionType &
  CommonRequestType &
  Theme;
