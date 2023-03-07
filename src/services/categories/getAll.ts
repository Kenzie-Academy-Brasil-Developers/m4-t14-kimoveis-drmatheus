import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";

export const getAllCategoriesService = async (): Promise<Category[]> => {
  const categoryRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  return await categoryRepo.find();
};
