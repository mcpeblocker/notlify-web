import express from "express";
import { ErrorHandler } from "../utils/errorHandler";
import regexs from "../utils/regexs";

export const checkObjectId = (
  req: express.Request,
  _: express.Response,
  next: express.NextFunction
) => {
  const id = req.params.id;  
  if (!id) return next(new ErrorHandler("id topilmadi", 404));

  try {
   const isValid = regexs.mongoDbID.test(id);
   if(!isValid) return next(new ErrorHandler("id xato", 404));
   next();
  } catch (err) {
    return next(new ErrorHandler("id xato", 404));
  }
};
