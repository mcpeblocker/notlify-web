import express from "express";
import jwtTokenService from "../services/jwt-token.service";
import { ErrorHandler } from "../utils/errorHandler";

export const auth = (
  req: express.Request,
  _: express.Response,
  next: express.NextFunction
) => {
  const token = req.cookies.token;  
  if (!token) return next(new ErrorHandler("Access Denied", 401));

  try {
    const verified = jwtTokenService.decode(token);
    if(!verified) return next(new ErrorHandler("Access Denied", 401));
    req.user = verified;
    next();
  } catch (err) {
    return next(new ErrorHandler("Invalid Auth Token", 401));
  }
};
