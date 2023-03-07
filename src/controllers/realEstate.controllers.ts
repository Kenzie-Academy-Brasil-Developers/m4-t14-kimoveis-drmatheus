import { Request, Response } from "express";
import { postRealEstateService } from "../services/realEstate/post";
import { getRealEstateService } from "../services/realEstate/get";

export const postRealEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const bodyRealEstate = req.body;

  const newRealEstate = await postRealEstateService(bodyRealEstate);

  return res.status(201).send(newRealEstate);
};

export const getRealEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const RealEstateList = await getRealEstateService();

  return res.status(200).send(RealEstateList);
};
