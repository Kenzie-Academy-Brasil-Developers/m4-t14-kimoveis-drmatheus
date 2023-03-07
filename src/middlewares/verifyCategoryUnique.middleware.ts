import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Category } from "../entities";
import { AppError } from "../error";

export const verifyCategoryUnique = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const categoryRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const categoryExist: boolean = await categoryRepo.exist({
    where: {
      name: req.body.name,
    },
  });

  if (categoryExist) {
    throw new AppError("Category already exists", 409);
  }

  next();
};
