import mongoose from "mongoose";
import app from "./app";
import dotenv from "dotenv";
import { count } from "console";

dotenv.config({ path: "./config.env" });

const PORT = 3000;

mongoose
  .connect(process.env.DATABASE_LOCAL!, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("DB connection successful!");
  });

app.listen(PORT, () => {
  console.log(`This app is listening on http://localhost:${PORT}`);
});
