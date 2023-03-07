import { DeepPartial, FindOperator, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, Category, RealEstate } from "../../entities";
import { INewRealEstate } from "../../interfaces";

export const postRealEstateService = async (
  realEstateBody: INewRealEstate
): Promise<any> => {
  let findCat: Category | null;

  if (realEstateBody.categoryId) {
    const categoryRepo: Repository<Category> =
      AppDataSource.getRepository(Category);

    findCat = await categoryRepo.findOneBy({
      id: realEstateBody.categoryId as FindOperator<number>,
    });
  } else {
    findCat = null;
  }

  const AddressesRepo: Repository<Address> =
    AppDataSource.getRepository(Address);

  const address: Address = AddressesRepo.create(
    realEstateBody.address as Address
  );

  const newAddress = await AddressesRepo.save(address);

  const realEstateRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const newRealEstate: RealEstate = realEstateRepo.create({
    ...(realEstateBody as RealEstate),
    address: newAddress,
    category: findCat!,
  });

  return await realEstateRepo.save(newRealEstate);
};
