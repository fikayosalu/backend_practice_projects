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

export const getAllTours = (req: Request, res: Response) => {
  // res.status(200).json({
  //   status: "success",
  //   data: {
  //     tours,
  //   },
  // });
};

export const getARoute = (req: Request, res: Response) => {
  console.log(req.params);
  const id = Number(req.params.id);
  console.log(id);

  // const tour = tours.find((obj) => {
  //   return obj.id === id;
  // });
  // if (tour) {
  //   res.status(200).json({
  //     status: "success",
  //     data: {
  //       tour,
  //     },
  //   });
  // } else {
  //   res.status(404).json({
  //     status: "failed",
  //     message: "Invalid ID",
  //   });
  // }
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
      message: "Invalid data sent",
    });
  }
};

export const updateARoute = (req: Request, res: Response) => {
  return res.status(200).json({
    status: "success",
    data: {
      tour: "<Updated tour here>",
    },
  });
};

export const deleteARoute = (req: Request, res: Response) => {
  return res.status(204).json({
    status: "success",
    data: {
      tour: null,
    },
  });
};
