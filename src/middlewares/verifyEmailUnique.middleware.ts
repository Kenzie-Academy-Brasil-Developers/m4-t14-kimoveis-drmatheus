import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../error";

export const verifyEmailUnique = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const usersRepo: Repository<User> = AppDataSource.getRepository(User);

  const userEmail: boolean = await usersRepo.exist({
    where: {
      email: req.body.email,
    },
  });

  if (userEmail) {
    throw new AppError("Email already exists", 409);
  }

  next();
};
