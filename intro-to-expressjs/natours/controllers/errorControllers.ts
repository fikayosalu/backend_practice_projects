import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";

interface MongooseErr {
  path: string;
  value: string;
  keyValue: { [key: string]: string };
}

const handleCastErrDB = (err: MongooseErr) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateErrorDB = (err: MongooseErr) => {
  const value = err.keyValue.name;
  const message = `Duplicate field value: ${value}. Please use another value!`;

  return new AppError(message, 400);
};

const sendErrorDev = (err: AppError, res: Response) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err: AppError, res: Response) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming or other unknown error: don't leak error details
  } else {
    // 1) Log error
    console.error("ERROR 💣", err);

    // 2) Send generic message
    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    let error = {
      ...err,
      message: err.message,
      name: err.name,
      stack: err.stack,
    };

    if (error.name === "CastError") error = handleCastErrDB(error);
    if (error.code === 11000) error = handleDuplicateErrorDB(error);
    sendErrorDev(error, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };

    if (error.name === "CastError") error = handleCastErrDB(error);

    if (error.code === 11000) error = handleDuplicateErrorDB(error);
    sendErrorProd(err, res);
  }
};

export default globalErrorHandler;
