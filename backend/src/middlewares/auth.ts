import jwt from "jsonwebtoken";
import express from "express";
import { config } from "../core/config";

export const auth = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({ success: false, error: "Access Denied" });

  try {
    const verified = jwt.verify(token, config.jwtSecret);
    // req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ success: false, error: "Invalid Auth Token" });
  }
};
