import { DeepPartial } from "typeorm";
import { Category, RealEstate } from "../entities";
import { Request, Response } from "express";
import { postCategoryService } from "../services/categories/post";
import { getCategoryService } from "../services/categories/get";
import { getAllCategoriesService } from "../services/categories/getAll";

export const postCategoryController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categoryData: any = req.body;

  const newCategory: DeepPartial<Category> = await postCategoryService(
    categoryData
  );

  return res.status(201).send(newCategory);
};

export const getCategoryController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categoryId: number = parseInt(req.params.id);

  const realEstateByCategory: any = await getCategoryService(categoryId);
  return res.status(200).send(realEstateByCategory);
};

export const getAllCategoriesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.status(200).send(await getAllCategoriesService());
};
