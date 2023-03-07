import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";

export const deleteUsersService = async (id: number): Promise<void> => {
  const usersRepo: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await usersRepo.findOne({
    where: {
      id: id,
    },
  });

  await usersRepo.remove(user!);
};
