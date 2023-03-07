import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

export const validateData =
  (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    const validatedObject = schema.parse(req.body);
    req.body = { ...validatedObject };
    next();
  };
