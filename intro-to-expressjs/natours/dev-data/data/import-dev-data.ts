import dotenv from "dotenv";
dotenv.config({ path: "../../config.env" });

import * as fs from "fs";
import mongoose from "mongoose";
import Tour from "../../models/tourModel";

mongoose
  .connect(process.env.DATABASE_LOCAL!, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("DB connection successful!");
  });

// READ JSON FILE

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8"),
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("Data successfully loaded");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.log(error);
  }
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log("Data successfully deleted!");
  } catch (error) {
    console.log(error);
  }
  await mongoose.disconnect();
  process.exit(0);
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
