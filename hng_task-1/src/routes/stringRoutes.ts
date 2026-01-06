/* This file contains all routes for the string analyzer endpoints */

import express from "express";
import * as stringController from "../controllers/stringController";

const stringRouter = express.Router();
stringRouter.route("/strings").post(stringController.createString);

export default stringRouter;
