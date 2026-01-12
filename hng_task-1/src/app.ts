import express from "express";
import stringRouter from "./routes/stringRoutes";
import morgan from "morgan";
const app = express();

app.use(express.json());
app.use(morgan("combined"));

app.use("/", stringRouter);

export default app;
