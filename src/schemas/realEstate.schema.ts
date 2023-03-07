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
  category: z.number().positive().nullish(),
});

export const returnRealEstateSchema = z.object({
  id: z.number().positive(),
  sold: z.boolean().optional(),
  value: z.string(),
  size: z.number().positive(),
  address: z.object({
    street: z.string().max(45),
    zipCode: z.string().max(8),
    number: z.string().max(7).nullish(),
    city: z.string().max(20),
    state: z.string().max(2),
  }),
  category: z.number().positive().nullish(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
