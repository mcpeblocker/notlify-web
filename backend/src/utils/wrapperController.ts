import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "./errorHandler";

const wrapperController = async (
  req: Request,
  res: Response,
  next: NextFunction,
  handler: Function
) => {
  try {
    await handler(req, res, next);
  } catch (e) {
    console.log(e);
    next(new ErrorHandler(String(e), 500));
  }
};

export default wrapperController;
