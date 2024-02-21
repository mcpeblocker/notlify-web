import express from "express";
import Joi from "joi";
import { ErrorHandler } from "../utils/errorHandler";

export const validate = (
  schema: Joi.Schema,
  property: "body" | "query" | "params"
) => {
  return (
    req: express.Request,
    _: express.Response,
    next: express.NextFunction
  ) => {
    const { error } = schema.validate(req[property]);
    console.log(error?.details);
        
    if (error) {
      return next(new ErrorHandler(error.details[0].message, 400));
    }
    next();
  };
};
