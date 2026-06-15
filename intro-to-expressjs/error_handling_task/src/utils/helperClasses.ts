export class ApiErrorClass extends Error {
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
