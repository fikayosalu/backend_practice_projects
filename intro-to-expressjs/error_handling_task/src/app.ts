import express, { Request, Response, NextFunction } from "express";
import "dotenv/config";

const app = express();

app.use(express.json());

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

app.post("/api/wallet/transfer", (req: Request, res: Response, next) => {
	const { senderId, receiverId, amount } = { ...req.body };

	if (!(senderId && receiverId && amount)) {
		return next(new ApiErrorClass(400, "Request contains missing fields"));
	}

	const transferAmount = parseFloat(amount);

	if (!transferAmount || transferAmount <= 0) {
		return next(
			new ApiErrorClass(400, "Transfer amount must be a positive number"),
		);
	}

	if (!users.senderId) {
		console.log(users.senderId);

		return next(new ApiErrorClass(404, "Sender account does not exist"));
	}

	if (!users.receiverId) {
		return next(new ApiErrorClass(404, "Receiver account does not exist"));
	}

	if (users.senderId.balance < transferAmount) {
		return next(
			new ApiErrorClass(
				400,
				`Sorry ${users.senderId.name}, you have insufficient balance`,
			),
		);
	}
	users.senderId.balance -= transferAmount;
	users.receiverId.balance += transferAmount;

	res.status(200).json({
		status: "success",
		message: "Transfer was successful",
		Amount: transferAmount,
	});

	next();
});

app.use((req, res, next) => {
	next(new ApiErrorClass(400, `The path ${req.originalUrl} does not exist`));
});

app.use(errorHandler);

export default app;

// {
//   "senderId": "user_123",
//   "receiverId": "user_456",
//   "amount": 500
// }
