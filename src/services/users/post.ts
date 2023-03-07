import { hashSync } from "bcryptjs";
import { DeepPartial, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { IReturnUser } from "../../interfaces";
import { newUserReturnSchema } from "../../schemas/users.schema";

export const postUsersService = async (
  newUser: DeepPartial<User>
): Promise<IReturnUser> => {
  const usersRepo: Repository<User> = AppDataSource.getRepository(User);

  /*newUser.password = hashSync(newUser.password!, 10);*/

  const user: DeepPartial<User> = usersRepo.create(newUser);

  return newUserReturnSchema.parse(await usersRepo.save(user));
};
