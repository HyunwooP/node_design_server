import { Style } from "@/entities/Style";
import { CommonRequest, Sort } from "./common";

type StyleRequestSubOption = {
  nameSort: Sort;
};

export type StyleRequest = StyleRequestSubOption & CommonRequest & Style;
