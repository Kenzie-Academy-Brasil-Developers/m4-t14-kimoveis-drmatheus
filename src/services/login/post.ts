import { compare } from "bcryptjs";
import { DeepPartial, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../error";
import { ILogin, IToken } from "../../interfaces";
import jwt from "jsonwebtoken";

export const postLoginService = async (loginData: ILogin): Promise<IToken> => {
  const usersRepo: Repository<User> = AppDataSource.getRepository(User);
  const count: number = await usersRepo.count({
    where: { email: loginData.email },
  });

  if (!count) {
    throw new AppError("Invalid credentials", 401);
  }

  const user: DeepPartial<User[]> = await usersRepo.find({
    where: { email: loginData.email },
  });

  if (user[0].deletedAt) {
    throw new AppError("Invalid credentials", 401);
  }

  const correctPass: boolean = await compare(
    loginData.password,
    user[0].password!
  );

  if (!correctPass) {
    throw new AppError("Invalid credentials", 401);
  }

  const token: string = jwt.sign(
    {
      admin: user[0].admin,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: "24h",
      subject: user[0].id!.toString(),
    }
  );

  return { token: token };
};
