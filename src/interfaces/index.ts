import { newUserSchema, newUserReturnSchema } from "../schemas/users.schema";
import { z } from "zod";
import { loginSchema } from "../schemas/login.schema";
import { newRealEstateSchema } from "../schemas/realEstate.schema";

export type IPostUser = z.infer<typeof newUserSchema>;
export type IReturnUser = z.infer<typeof newUserReturnSchema>;
export type ILogin = z.infer<typeof loginSchema>;

export type INewRealEstate = z.infer<typeof newRealEstateSchema>;

export interface IToken {
  token: string;
}
