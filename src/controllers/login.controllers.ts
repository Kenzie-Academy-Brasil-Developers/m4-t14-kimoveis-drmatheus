import { postLoginService } from "../services/login/post";
import { Request, Response } from "express";

export const postLoginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const loginData: any = req.body;

  const token = await postLoginService(loginData);

  return res.status(200).send(token);
};
