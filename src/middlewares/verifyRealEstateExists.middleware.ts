import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { RealEstate } from "../entities";
import { AppError } from "../error";

export const verifyRealEstateExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const usersRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const realEstateExist: boolean = await usersRepo.exist({
    where: {
      id: parseInt(req.params.id),
    },
  });

  if (!realEstateExist) {
    throw new AppError("RealEstate not found", 404);
  }

  next();
};

export const verifyRealEstateInBodyExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const usersRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const realEstateExist: boolean = await usersRepo.exist({
    where: {
      id: parseInt(req.body.realEstateId),
    },
  });

  if (!realEstateExist) {
    throw new AppError("RealEstate not found", 404);
  }

  next();
};
