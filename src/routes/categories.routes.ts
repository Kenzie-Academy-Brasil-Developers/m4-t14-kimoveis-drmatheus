import { Router } from "express";
import {
  postCategoryController,
  getCategoryController,
  getAllCategoriesController,
} from "../controllers/categories.controllers";
import { validateData, verifyCategoryExist } from "../middlewares";
import { verifyPermissionAdmin } from "../middlewares/verifyPermission.middleware";
import { verifyCategoryUnique } from "../middlewares/verifyCategoryUnique.middleware";
import { categorySchema } from "../schemas/category.schema";

export const categoryRoutes: Router = Router();

categoryRoutes.post(
  "",
  verifyPermissionAdmin,
  validateData(categorySchema),
  verifyCategoryUnique,
  postCategoryController
);

categoryRoutes.get(
  "/:id/realEstate",
  verifyCategoryExist,
  getCategoryController
);

categoryRoutes.get("", getAllCategoriesController);
