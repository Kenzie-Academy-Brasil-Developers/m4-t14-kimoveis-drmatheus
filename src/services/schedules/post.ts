import { verify } from "jsonwebtoken";
import { FindManyOptions, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule, User } from "../../entities";
import { AppError } from "../../error";

export const postSchedulesService = async (
  scheduleBody: any,
  token: string
): Promise<{ message: string }> => {
  let uid: number;

  verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {
    uid = decoded.sub;
  });

  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepo.findOneBy({ id: uid! });

  const realEstateRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const realEstate: RealEstate | null = await realEstateRepo.findOneBy({
    id: scheduleBody.realEstateId,
  });

  const scheduleRepo: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);

  const verifyDisponibilityRealState = await scheduleRepo.exist({
    where: {
      date: scheduleBody.date,
      hour: scheduleBody.hour,
      realEstate: realEstate,
    },
  } as FindManyOptions);

  if (verifyDisponibilityRealState)
    throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );

  const verifyDisponibilityUser = await scheduleRepo.exist({
    where: {
      date: scheduleBody.date,
      hour: scheduleBody.hour,
      user: user,
    },
  } as FindManyOptions);

  if (verifyDisponibilityUser)
    throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );

  const createSchedule: any = scheduleRepo.create({
    ...scheduleBody,
    user: user,
    realEstate: realEstate,
  });

  await scheduleRepo.save(createSchedule);

  return { message: "Schedule created" };
};
