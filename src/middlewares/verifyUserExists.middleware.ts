import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../error";

export const verifyUserExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const usersRepo: Repository<User> = AppDataSource.getRepository(User);

  const userExist: boolean = await usersRepo.exist({
    where: {
      id: parseInt(req.params.id),
    },
  });

  if (!userExist) {
    throw new AppError("User not found", 404);
  }

  next();
};
