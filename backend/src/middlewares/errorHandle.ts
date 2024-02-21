import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../utils/errorHandler";

export const ErrorHandle = (
  err: ErrorHandler,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  return res.status(err.status).json({
    success: false,
    error: err.message,
    status: err.status,
  });
};
