import { Router } from "express";
import {
  getRealEstateController,
  postRealEstateController,
} from "../controllers/realEstate.controllers";
import { validateData, verifyPermissionAdmin } from "../middlewares";
import { newRealEstateSchema } from "../schemas/realEstate.schema";
import { verifyAddressUnique } from "../middlewares";

export const realEstateRoutes: Router = Router();

realEstateRoutes.post(
  "",
  verifyPermissionAdmin,
  validateData(newRealEstateSchema),
  verifyAddressUnique,
  postRealEstateController
);

realEstateRoutes.get("", getRealEstateController);
