import express, { Request, Response, NextFunction } from "express";

const app = express();

const users: Record<string, { name: string; balance: number }> = {
	user1: { name: "Tolu", balance: 5000 },
	user2: { name: "Ade", balance: 5000 },
	user3: { name: "Sayo", balance: 5000 },
	user4: { name: "Bolu", balance: 5000 },
	user5: { name: "Lawal", balance: 5000 },
	user6: { name: "David", balance: 5000 },
};

class ApiErrorClass extends Error {
	status: string;
	statusCode: number;
	isOperational: boolean;

	constructor(statusCode: number, message: string) {
		super(message);
		this.status = `${statusCode}`.startsWith("5") ? "error" : "failed";
		this.statusCode = statusCode;
		this.isOperational = true;
	}
}

const sendErrorDev = (res: Response, err: ApiErrorClass) => {
	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
		stack: err.stack,
		error: err,
	});
};
const sendErrorProd = (res: Response, err: ApiErrorClass) => {
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

const errorHandler = (
	err: ApiErrorClass,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || "error";

	if (process.env.NODE_ENV === "development") {
		sendErrorDev(res, err);
	}
	if (process.env.NODE_ENV === "production") {
		sendErrorProd(res, err);
	}

	next();
};

app.use(express.json());

app.post("api/wallet/transfer", (req: Request, res: Response) => {
	const { senderId, receiverId, amount } = { ...req.body };

	if (!(senderId && receiverId && amount)) {
		return new ApiErrorClass(400, "Request contains missing fields");
	}

	if (!users.senderId) {
		return new ApiErrorClass(404, "Sender account does not exist");
	}
});

app.use(errorHandler);

export default app;

// {
//   "senderId": "user_123",
//   "receiverId": "user_456",
//   "amount": 500
// }
