import { Request, Response } from "express";
import { IReturnUser } from "../interfaces";
import { DeepPartial } from "typeorm";
import { User } from "../entities";
import { postUsersService } from "../services/users/post";
import { patchUsersService } from "../services/users/patch";
import { deleteUsersService } from "../services/users/delete";
import { getUsersService } from "../services/users/get";

export const postUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: DeepPartial<User> = req.body;

  const newUser: IReturnUser = await postUsersService(userData);

  return res.status(201).send(newUser);
};

export const patchUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: DeepPartial<User> = req.body;
  const id: number = parseInt(req.params.id);

  const attUser: IReturnUser = await patchUsersService(userData, id);

  return res.status(200).send(attUser);
};

export const deleteUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = parseInt(req.params.id);

  await deleteUsersService(id);

  return res.status(204).json();
};

export const getUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = parseInt(req.params.id);

  const userList = await getUsersService();

  return res.status(200).send(userList);
};
