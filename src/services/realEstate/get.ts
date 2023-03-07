import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";
import { returnRealEstateSchema } from "../../schemas/realEstate.schema";

export const getRealEstateService = async (): Promise<any> => {
  const RealEstatesRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const realEstateList: RealEstate[] = await RealEstatesRepo.find({
    relations: ["address"],
  });

  return realEstateList;
};
