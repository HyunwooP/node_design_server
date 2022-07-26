import { Theme } from "@/entities/Theme";
import { CommonRequestType, SortType } from "./common";

type ThemeRequestSubOptionType = {
  nameSort: SortType;
};

export type ThemeRequestType = ThemeRequestSubOptionType &
  CommonRequestType &
  Theme;
