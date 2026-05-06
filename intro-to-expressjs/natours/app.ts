import express from "express";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import morgan from "morgan";
import tourRouter from "./routes/tourRoutes";
import { router as userRouter } from "./routes/userRoutes";
import AppError from "./utils/appError";
import globalErrorHandler from "./controllers/errorControllers";

const app = express();

app.use(express.json());
app.set("query parser", "extended");

app.use(morgan("combined"));

app.use("/api/v1/tours", tourRouter);

app.use("/api/v1/users", userRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(
    new AppError(
      `This url ${req.originalUrl} does not exist in the server`,
      404,
    ),
  );
});

app.use(globalErrorHandler);

export default app;
