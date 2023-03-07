import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Category } from "../entities";
import { AppError } from "../error";

export const verifyCategoryExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const categoryRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const categoryExist: boolean = await categoryRepo.exist({
    where: {
      id: parseInt(req.params.id),
    },
  });

  if (!categoryExist) {
    throw new AppError("Category not found", 404);
  }

  next();
};
