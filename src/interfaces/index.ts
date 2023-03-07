import { newUserSchema, newUserReturnSchema } from "../schemas/users.schema";
import { z } from "zod";
import { loginSchema } from "../schemas/login.schema";

export type IPostUser = z.infer<typeof newUserSchema>;
export type IReturnUser = z.infer<typeof newUserReturnSchema>;
export type ILogin = z.infer<typeof loginSchema>;

export interface IToken {
  token: string;
}
