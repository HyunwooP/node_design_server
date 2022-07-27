import { Component } from "@/entities/Component";
import { CommonRequest, Sort } from "./common";

type ComponentRequestSubOption = {
  nameSort: Sort;
};

export type ComponentRequest = ComponentRequestSubOption &
  CommonRequest &
  Component;
