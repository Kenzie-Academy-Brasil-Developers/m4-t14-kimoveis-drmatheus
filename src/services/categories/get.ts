import { FindManyOptions, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category, RealEstate } from "../../entities";

export const getCategoryService = async (
  categoryId: number
): Promise<{
  id: number | undefined;
  name: string | undefined;
  realEstate: RealEstate[];
}> => {
  const realEstateRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const categoryRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const category = await categoryRepo.findOne({ where: { id: categoryId } });

  const realEstateByCategory: RealEstate[] = await realEstateRepo.find({
    where: { category: categoryId },
  } as FindManyOptions<RealEstate>);

  return {
    id: category?.id,
    name: category?.name,
    realEstate: [...realEstateByCategory],
  };
};
