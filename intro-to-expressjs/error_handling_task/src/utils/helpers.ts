import { Request, Response, NextFunction } from "express";
import { ApiErrorClass } from "./helperClasses";

/// ERROR HANDLER UTILS

export const handleUserNotFoundErr = () => {
	const message = "The sender or receiver user does not exist";

	return new ApiErrorClass(404, message);
};

export const sendErrorDev = (res: Response, err: any) => {
	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
		stack: err.stack,
		error: err,
	});
};
export const sendErrorProd = (res: Response, err: any) => {
	if (err.isOperational) {
		res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
		});
	} else {
		console.error(err);
		res.status(500).json({
			status: "error",
			message: "Something went wrong",
		});
	}
};

export const catchAsync = (
	fn: (
		req: Request,
		res: Response,
		next: NextFunction,
	) => Promise<void | Response>,
) => {
	return (req: Request, res: Response, next: NextFunction) => {
		fn(req, res, next).catch(next);
	};
};
