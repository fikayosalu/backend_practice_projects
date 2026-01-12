/* This file contains all routes for the string analyzer endpoints */

import express from "express";
import * as stringController from "../controllers/stringController";

const stringRouter = express.Router();
stringRouter.route("/strings").post(stringController.createString);
stringRouter.route("/strings/:string").get(stringController.getString);
stringRouter.route("/strings").get(stringController.getAllString);
stringRouter.route("/strings/:string").delete(stringController.deleteString);

export default stringRouter;
