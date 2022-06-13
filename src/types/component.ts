import { Component } from "@/models/Component";
import { CommonRequestType, SortType } from "./common";

type ComponentRequestSubOptionType = {
  nameSort: SortType;
};

export type ComponentRequestType = ComponentRequestSubOptionType &
  CommonRequestType &
  Component;
