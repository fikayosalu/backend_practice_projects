import Tour from "../models/tourModel";
import { Response, Request, NextFunction } from "express";
import { Query } from "mongoose";
import APIFeatures from "../utils/apiFeatures";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";

type tourFrame = {
  id: number;
  name: string;
  duration: number;
  maxGroupSize: number;
  difficulty: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  price: number;
  summary: string;
  imageCover: string;
  images: string[];
  startDates: string[];
};

// BUILD QUERY
// 1A FILTERING
// const queryObj = { ...req.query };
// const excludedFields = ["page", "sort", "limit", "fields"];

// excludedFields.forEach((el) => delete queryObj[el]);
// console.log(queryObj);

// // ADVANCED FILTERING FOR <, >, <=, >=

// let queryStr = JSON.stringify(queryObj);
// queryStr = queryStr.replace(/\b(gte|lte|lt|gt)\b/g, (match) => `$${match}`);
// console.log(JSON.parse(queryStr));

// let query = Tour.find(JSON.parse(queryStr));

// SORTING FILTERING
// if (req.query.sort) {
//   let sortBy = req.query.sort as string;
//   sortBy = sortBy.split(",").join(" ");
//   query = query.sort(sortBy);
// } else {
//   query = query.sort("-createdAt");
// }

// FIELD LIMITING
// if (req.query.fields) {
//   let fields = req.query.fields as string;
//   fields = fields.split(",").join(" ");

//   query = query.select(fields);
// } else {
//   query = query.select("-__v");
// }

// Pagination
// if (req.query.page && req.query.limit) {
//   const page: number = Number(req.query.page as string) || 1;
//   const limit: number = Number(req.query.limit as string) || 100;
//   const skip = (page - 1) * limit;
//   const numTours = await Tour.countDocuments();

//   query = query.sort("price").skip(skip).limit(limit);

//   if (skip >= numTours) {
//     throw new Error("This page does not exist");
//   }
// }

// export const checkId = (
//   req: Request,
//   res: Response,
//   next: NextFunction,
//   val: string,
// ) => {
//   if (Number(val) > tours.length) {
//     return res.status(404).json({
//       status: "failed",
//       message: "Invalid ID",
//     });
//   }
//   next();
//   return;
// };

export const getAllTours = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const features = new APIFeatures(req.query, Tour.find())
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;
    res.status(200).json({
      status: "success",
      results: tours.length,
      data: {
        tours,
      },
    });
  },
);

export const getTour = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const tour = await Tour.findById(req.params.id);
    // Tour.findOne({ _id: req.params.id })

    res.status(200).json({
      status: "success",
      data: tour,
    });
  },
);

export const createATour = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  },
);
export const updateARoute = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  },
);

export const deleteARoute = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  },
);

export const getTourStats = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: "$difficulty",
          numTours: { $sum: 1 },
          avgRating: { $avg: "$ratingsAverage" },
          avgPrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
        },
      },
      {
        $sort: { avgPrice: 1 },
      },
    ]);

    res.status(200).json({
      status: "success",
      data: stats,
    });
  },
);
