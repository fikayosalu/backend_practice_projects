import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";

const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  return res.status(err.statusCode || 500).json({
    status: err.status || "error",
    message: err.message,
  });
};

export default globalErrorHandler;
