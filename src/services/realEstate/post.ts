import {
  DeepPartial,
  FindManyOptions,
  FindOperator,
  Repository,
} from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, Category, RealEstate } from "../../entities";
import { AppError } from "../../error";
import { returnRealEstateSchema } from "../../schemas/realEstate.schema";

export const postRealEstateService = async (
  realEstateBody: DeepPartial<RealEstate>
): Promise<any> => {
  const AddressesRepo: Repository<Address> =
    AppDataSource.getRepository(Address);

  const verifyAddress = await AddressesRepo.createQueryBuilder("address")
    .select("address.*")
    .distinct(true)
    .where("address.street = :street", {
      street: realEstateBody.address?.street,
    })
    .andWhere("address.zipCode = :zipCode", {
      zipCode: realEstateBody.address?.zipCode,
    })
    .andWhere("address.city = :city", { city: realEstateBody.address?.city })
    .andWhere("address.state = :state", {
      state: realEstateBody.address?.state,
    })
    .getOne();

  if (verifyAddress) {
    throw new AppError("Address already used", 409);
  }

  const address: DeepPartial<Address> = AddressesRepo.create(
    realEstateBody.address!
  );

  const categoryRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const findCat: Category | null = await categoryRepo.findOneBy({
    id: realEstateBody.category as FindOperator<number>,
  });

  const newAddress = await AddressesRepo.save(address);

  const realEstateRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const newRealEstate: any = realEstateRepo.create({
    ...realEstateBody,
    address: newAddress,
    category: findCat!,
  });

  const saveNewEstate = await realEstateRepo.save(newRealEstate);

  //const parseNewEstate = returnRealEstateSchema.parse(saveNewEstate);

  return saveNewEstate;
};
