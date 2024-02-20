import { NextFunction, Response } from "express";
import { ErrorHandler } from "./errorHandler";

const succesResponse = async (
  res: Response,
  data: any,
  next: NextFunction
) => {
  

  try {
    res.status(200).json({
      success: true,
      message: "Muvaffaqiyatli bajarildi",
      data,
    });
  } catch (e) {
    next(new ErrorHandler(String(e), 500));
  }
};

export default succesResponse;
