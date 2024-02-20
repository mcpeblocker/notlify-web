import express from "express";
import Joi from "joi";

export const validate = (
  schema: Joi.Schema,
  property: "body" | "query" | "params"
) => {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const { error } = schema.validate(req[property]);
    console.log(error?.details);
        
    if (error) {
      return res
        .status(400)
        .json({ success: false, error: error.details[0].message });
    }
    next();
  };
};
