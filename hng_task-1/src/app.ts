import express from "express";
import stringRouter from "./routes/stringRoutes";
const app = express();

app.use(express.json());

app.use("/", stringRouter);

export default app;
