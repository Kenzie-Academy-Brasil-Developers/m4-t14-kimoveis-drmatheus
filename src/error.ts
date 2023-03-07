import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export class AppError extends Error {
  message: string;
  statusCode: number;

  constructor(message: string, statusCodes: number = 400) {
    super();
    this.message = message;
    this.statusCode = statusCodes;
  }
}

export const handleErrors = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).send({ message: error.message });
  }

  if (error instanceof ZodError) {
    return res.status(400).send({ message: error.flatten().fieldErrors });
  }

  console.log(error);
  return res.status(500).send({ message: "Internal error server." });
};
