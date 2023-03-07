import { DeepPartial, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";

export const postCategoryService = async (
  categoryBody: DeepPartial<Category>
): Promise<Category> => {
  const categoryRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const category: DeepPartial<Category> = categoryRepo.create(categoryBody);

  return categoryRepo.save(category);
};
