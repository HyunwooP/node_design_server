import { Component } from "@/entities/Component";
import { CommonRequestType, SortType } from "./common";

type ComponentRequestSubOptionType = {
  nameSort: SortType;
};

export type ComponentRequestType = ComponentRequestSubOptionType &
  CommonRequestType &
  Component;
