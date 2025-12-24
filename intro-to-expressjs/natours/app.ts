import express from "express";
import { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import tourRouter from "./routes/tourRoutes";
import { router as userRouter } from "./routes/userRoutes";

const app = express();

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Hello from the middleware");
  next();
});
app.use(morgan("combined"));

app.use("/api/v1/tours", tourRouter);

app.use("/api/v1/users", userRouter);

export default app;
