import { Router } from "express";
import {
  deleteUsersController,
  getUsersController,
  patchUsersController,
  postUsersController,
} from "../controllers/users.controllers";
import {
  validateData,
  verifyEmailUnique,
  verifyPermissionAdmin,
  verifyPermissionUser,
  verifyUserExist,
} from "../middlewares/";
import { verifyPermissionPatchUser } from "../middlewares/verifyPermission.middleware";
import { newUserSchema, patchUserSchema } from "../schemas/users.schema";

export const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  verifyEmailUnique,
  validateData(newUserSchema),
  postUsersController
);
usersRoutes.patch(
  "/:id",
  verifyUserExist,
  verifyPermissionPatchUser,
  validateData(patchUserSchema),
  patchUsersController
);
usersRoutes.delete(
  "/:id",
  verifyUserExist,
  verifyPermissionAdmin,
  deleteUsersController
);
usersRoutes.get("", verifyPermissionAdmin, getUsersController);
