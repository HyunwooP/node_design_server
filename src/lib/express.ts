import express from "express";
import { initializeMiddleWare } from ".";

const createExpress = (): express.Application => {
  return initializeMiddleWare(express());
};

export default createExpress;