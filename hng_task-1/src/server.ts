import path from "node:path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../config.env") });
import app from "./app";
import mongoose from "mongoose";

const PORT = 3000;

mongoose.connect(process.env.DATABASE_URI!).then(() => {
	console.log("DB connection successful!");
});

app.listen(PORT, () => {
	console.log(`Server is listening on http://localhost:${PORT}`);
});
