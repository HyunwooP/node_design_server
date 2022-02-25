import { CommonRequestType, SortType } from "@/models/Common/type";
import { Component } from "./entity";

type ComponentRequestSubOptionType = {
  nameSort: SortType;
};

export type ComponentRequestType = ComponentRequestSubOptionType & CommonRequestType & Component;