import {
  DeepPartial,
  FindManyOptions,
  getConnection,
  getRepository,
  Repository,
} from "typeorm";
import { any } from "zod";
import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule, User } from "../../entities";

export const getScheduleByIdService = async (
  realEstateId: number
): Promise<any> => {
  const realEstate: RealEstate | null = await AppDataSource.getRepository(
    RealEstate
  )
    .createQueryBuilder("realEstate")
    .leftJoinAndSelect("realEstate.address", "address")
    .leftJoinAndSelect("realEstate.category", "category")
    .where("realEstate.id = :id", { id: realEstateId })
    .getOne();

  const schedules: Schedule[] | null = await AppDataSource.createQueryBuilder(
    Schedule,
    "schedule"
  )
    .leftJoinAndSelect("schedule.user", "scheduleUser")
    .where("schedule.realEstateId = :realEstateId", { realEstateId })
    .getMany();

  return { ...realEstate, schedules: schedules };
};
