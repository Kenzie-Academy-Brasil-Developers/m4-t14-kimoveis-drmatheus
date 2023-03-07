import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../error";

export const verifyPermissionAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    throw new AppError("Missing bearer token", 401);
  }

  const token = req.headers.authorization.split(" ")[1];

  verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }

    if (!decoded.admin) {
      throw new AppError("Insufficient permission", 403);
    }
  });

  next();
};

export const verifyPermissionUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    throw new AppError("Missing bearer token", 401);
  }

  const token = req.headers.authorization.split(" ")[1];

  verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {
    if (error) throw new AppError(error.message, 401);
  });

  next();
};

export const verifyPermissionPatchUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    throw new AppError("Missing bearer token", 401);
  }

  const token = req.headers.authorization.split(" ")[1];

  verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {
    if (error) throw new AppError(error.message, 401);
    if (decoded.admin) {
      return;
    }
    if (decoded.sub != req.params.id) {
      throw new AppError("Insufficient permission", 403);
    }
  });

  next();
};
