import { z } from "zod";

export const newRealEstateSchema = z.object({
  sold: z.boolean().optional(),
  value: z.any(),
  size: z.number().positive(),
  address: z.object({
    street: z.string().max(45),
    zipCode: z.string().max(8),
    number: z.string().max(7).nullish(),
    city: z.string().max(20),
    state: z.string().max(2),
  }),
  categoryId: z.any().nullish(),
});

export const returnRealEstateSchema = z.object({
  id: z.number().positive(),
  value: z.any(),
  size: z.number().positive(),
  category: z.object({
    id: z.number(),
    name: z.string(),
  }),
  createdAt: z.string(),
  updatedAt: z.string(),
});
