import { date, number, z } from "zod";

export const newUserSchema = z.object({
  name: z.string().max(45),
  email: z.string().email(),
  password: z.string().max(120),
  admin: z.boolean().optional(),
});

export const patchUserSchema = z.object({
  name: z.string().max(45).optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
});

export const newUserReturnSchema = newUserSchema
  .omit({
    password: true,
  })
  .extend({
    id: number(),
    createdAt: z.string(),
    updatedAt: z.string().nullish(),
    deletedAt: z.string().nullish(),
  });
