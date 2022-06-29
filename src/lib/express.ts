import express from "express";
import { initializeMiddleWare } from ".";

export default (): express.Application => {
  return initializeMiddleWare(express());
};
