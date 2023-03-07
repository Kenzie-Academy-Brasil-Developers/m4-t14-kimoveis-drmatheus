import { Router } from "express";
import {
  getSchedulesByIdController,
  postSchedulesController,
} from "../controllers/schedules.controller";
import {
  validateData,
  verifyPermissionAdmin,
  verifyRealEstateExist,
  validateDateAndHour,
  verifyPermissionUser,
  verifyRealEstateInBodyExist,
} from "../middlewares";

import { scheduleSchema } from "../schemas/schedule.schema";

export const schedulesRoutes: Router = Router();
schedulesRoutes.post(
  "",
  verifyPermissionUser,
  validateData(scheduleSchema),
  verifyRealEstateInBodyExist,
  validateDateAndHour,
  postSchedulesController
);

schedulesRoutes.get(
  "/realEstate/:id",
  verifyRealEstateExist,
  verifyPermissionAdmin,
  verifyRealEstateExist,
  getSchedulesByIdController
);
