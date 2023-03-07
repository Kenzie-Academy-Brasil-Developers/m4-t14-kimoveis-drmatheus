import { z } from "zod";

export const refineTime = (string: string): boolean => {
  const fixedString: number = parseInt(string.replace(":", ""));
  const available: boolean = fixedString >= 800 && fixedString <= 1800;
  return !available;
};

export const refineDate = (string: string): boolean => {
  const newDate: Date = new Date(string);
  const date = newDate.toString().split(" ");

  const available = date[0] == "Sat" || date[0] == "Sun";

  return available;
};

export const scheduleSchema = z.object({
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number().int().positive(),
});
