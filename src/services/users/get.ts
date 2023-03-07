import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { IReturnUser } from "../../interfaces";
import { newUserReturnSchema } from "../../schemas/users.schema";

export const getUsersService = async (): Promise<IReturnUser[]> => {
  const usersRepo: Repository<User> = AppDataSource.getRepository(User);

  const attUser: User[] = await usersRepo.find();

  const userWithoutPassword = attUser.map((user) =>
    newUserReturnSchema.parse(user)
  );

  return userWithoutPassword;
};
