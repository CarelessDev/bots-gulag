import { z } from "zod";

const environmentSchema = z.object({
  MAO_TOKEN: z.string().min(10),
  SKITTLE_NEE: z.string().min(10),
  VLADIMIR: z.string().min(10),
  WESSUWAN: z.string().min(10),
  CAPPUCHINO: z.string().min(10),
});

export const environment = environmentSchema.parse(process.env);
