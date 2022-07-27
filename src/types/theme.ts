import { Theme } from "@/entities/Theme";
import { CommonRequest, Sort } from "./common";

type ThemeRequestSubOption = {
  nameSort: Sort;
};

export type ThemeRequest = ThemeRequestSubOption &
  CommonRequest &
  Theme;
