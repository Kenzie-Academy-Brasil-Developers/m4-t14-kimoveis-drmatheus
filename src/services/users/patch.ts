import { DeepPartial, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { IReturnUser } from "../../interfaces";
import { newUserReturnSchema } from "../../schemas/users.schema";

export const patchUsersService = async (
  patchUser: DeepPartial<User>,
  id: number
): Promise<IReturnUser> => {
  const usersRepo: Repository<User> = AppDataSource.getRepository(User);

  await usersRepo.save({ id: id, ...patchUser });

  const attUser: User[] = await usersRepo.find({ where: { id: id } });

  return newUserReturnSchema.parse(attUser[0]);
};
