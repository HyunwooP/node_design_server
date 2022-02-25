import { CommonRequestType, SortType } from "@/models/Common/type";
import { Style } from "./entity";

type StyleRequestSubOptionType = {
  nameSort: SortType;
};

export type StyleRequestType = StyleRequestSubOptionType & CommonRequestType & Style;