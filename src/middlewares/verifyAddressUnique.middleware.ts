import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Address, RealEstate } from "../entities";
import { AppError } from "../error";

export const verifyAddressUnique = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const addressRepo: Repository<Address> = AppDataSource.getRepository(Address);

  const newAddress = req.body.address;

  const address: boolean = await addressRepo.exist({
    where: {
      ...newAddress,
    },
  });

  if (address) {
    throw new AppError("Address already exists", 409);
  }

  next();
};
