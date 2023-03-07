import { DeepPartial, FindOperator, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, Category, RealEstate } from "../../entities";
import { AppError } from "../../error";
import { returnRealEstateSchema } from "../../schemas/realEstate.schema";

export const postRealEstateService = async (
  realEstateBody: DeepPartial<RealEstate>
): Promise<any> => {
  //VERIFICANDO SE A CATEGORIA EXISTE

  const categoryRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const categoryExist: boolean = await categoryRepo.exist({
    where: {
      id: realEstateBody.category as FindOperator<number>,
    },
  });

  if (!categoryExist) {
    throw new AppError("Category not found", 404);
  }

  // BUSCANDO A CATEGORIA

  const findCat: Category | null = await categoryRepo.findOneBy({
    id: realEstateBody.category as FindOperator<number>,
  });

  // CRIANDO ENDEREÇO

  const AddressesRepo: Repository<Address> =
    AppDataSource.getRepository(Address);

  const address: DeepPartial<Address> = AddressesRepo.create(
    realEstateBody.address!
  );

  const newAddress = await AddressesRepo.save(address);

  //CRIANDO NOVO IMOVEL

  const realEstateRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const newRealEstate: any = realEstateRepo.create({
    ...realEstateBody,
    address: newAddress,
    category: findCat!,
  });

  // RETORNO

  const saveNewEstate = await realEstateRepo.save(newRealEstate);

  if (saveNewEstate.address.number) {
    return saveNewEstate;
  }

  //RETORNO PARA PROPRIEDADE SEM NUMERO NO ENDEREÇO

  const parseNewEstate = returnRealEstateSchema.parse(saveNewEstate);
  return parseNewEstate;
};
