import express, { Request, Response, NextFunction } from "express";
import { findUser, updateBalance } from "./database";
import { ApiErrorClass } from "./utils/helperClasses";
import { catchAsync, sendErrorDev, sendErrorProd } from "./utils/helpers";
import { handleUserNotFoundErr } from "./utils/helpers";
import "dotenv/config";

const app = express();

app.use(express.json());

// const users: Record<string, { name: string; balance: number }> = {
// 	user1: { name: "Tolu", balance: 5000 },
// 	user2: { name: "Ade", balance: 5000 },
// 	user3: { name: "Sayo", balance: 5000 },
// 	user4: { name: "Bolu", balance: 5000 },
// 	user5: { name: "Lawal", balance: 5000 },
// 	user6: { name: "David", balance: 5000 },
// };

const errorHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || "error";

	if (process.env.NODE_ENV === "development") {
		sendErrorDev(res, err);
	} else if (process.env.NODE_ENV === "production") {
		let error = {
			...err,
			name: err.name,
			message: err.message,
			stack: err.stack,
		};

		if (err.message === "User not found") error = handleUserNotFoundErr();
		sendErrorProd(res, error);
	} else {
		res.status(500).json({
			status: "error",
			message: "Something went wrong",
		});
	}
};

app.post(
	"/api/wallet/transfer",
	catchAsync(async (req: Request, res: Response) => {
		const { senderId, receiverId, amount } = req.body;

		if (!(senderId && receiverId && amount)) {
			throw new ApiErrorClass(400, "Request contains missing fields");
		}

		const transferAmount = parseFloat(amount);

		if (!transferAmount || transferAmount <= 0) {
			throw new ApiErrorClass(400, "Transfer amount must be a positive number");
		}

		const sender = await findUser(senderId);

		const receiver = await findUser(receiverId);

		if (sender.balance < transferAmount) {
			throw new ApiErrorClass(
				400,
				`Sorry ${sender.name}, you have insufficient balance`,
			);
		}

		await updateBalance(senderId, sender.balance - transferAmount);
		await updateBalance(receiverId, receiver.balance + transferAmount);

		res.status(200).json({
			status: "success",
			message: "Transfer was successful",
			Amount: transferAmount,
		});
	}),
);

app.use((req, res, next) => {
	next(new ApiErrorClass(404, `The path ${req.originalUrl} does not exist`));
});

app.use(errorHandler);

export default app;

// {
//   "senderId": "user_123",
//   "receiverId": "user_456",
//   "amount": 500
// }
