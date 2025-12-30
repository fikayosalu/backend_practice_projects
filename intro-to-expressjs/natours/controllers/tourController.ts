import { match } from "assert";
import Tour from "../models/tourModel";
import { Response, Request, NextFunction } from "express";

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

export const getAllTours = async (req: Request, res: Response) => {
  try {
    // BUILD QUERY
    // 1A FILTERING
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];

    excludedFields.forEach((el) => delete queryObj[el]);
    console.log(queryObj);

    // ADVANCED FILTERING FOR <, >, <=, >=

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|lte|lt|gt)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));

    let query = Tour.find(JSON.parse(queryStr));

    // SORTING FILTERING
    if (req.query.sort) {
      let sortBy = req.query.sort as string;
      sortBy = sortBy.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // FIELD LIMITING
    if (req.query.fields) {
      let fields = req.query.fields as string;
      fields = fields.split(",").join(" ");

      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // Pagination
    if (req.query.page && req.query.limit) {
      const page: number = Number(req.query.page as string) || 1;
      const limit: number = Number(req.query.limit as string) || 100;
      const skip = (page - 1) * limit;
      const numTours = await Tour.countDocuments();

      query = query.sort("price").skip(skip).limit(limit);

      if (skip >= numTours) {
        throw new Error("This page does not exist");
      }
    }

    const tours = await query;

    res.status(200).json({
      status: "success",
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (error: any) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const getTour = async (req: Request, res: Response) => {
  try {
    const tour = await Tour.findById(req.params.id);
    // Tour.findOne({ _id: req.params.id })

    res.status(200).json({
      status: "success",
      data: tour,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

export const createATour = async (req: Request, res: Response) => {
  try {
    // const newTour = new Tour({})
    // newTour.save()
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

export const updateARoute = async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

export const deleteARoute = async (req: Request, res: Response) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: "success",
      message: error,
    });
  }
};
