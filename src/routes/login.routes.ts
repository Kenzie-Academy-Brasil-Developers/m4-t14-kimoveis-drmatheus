import { Router } from "express";
import { postLoginController } from "../controllers/login.controllers";
import { validateData } from "../middlewares";
import { loginSchema } from "../schemas/login.schema";

export const loginRoutes: Router = Router();

loginRoutes.post("", validateData(loginSchema), postLoginController);
