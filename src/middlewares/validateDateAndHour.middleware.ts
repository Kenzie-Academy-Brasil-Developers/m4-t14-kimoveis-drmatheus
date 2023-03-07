import { refineTime, refineDate } from "../schemas/schedule.schema";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";

export const validateDateAndHour = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (refineDate(req.body.date)) {
    throw new AppError("Invalid date, work days are monday to friday");
  }

  if (refineTime(req.body.hour)) {
    throw new AppError("Invalid hour, available times are 8AM to 18PM");
  }

  next();
};
