import { z } from "zod";

const environmentSchema = z.object({
  MAO_TOKEN: z.string().min(10),
  SKITTLE_NEE: z.string().min(10),
  VLADIMIR: z.string().min(10),
  WESSUWAN: z.string().min(10),
  CAPPUCHINO: z.string().min(10),
  EMU: z.string().min(10),
  EMU_TARGET: z.string().min(10),
  EMU_GUILD: z.string().min(10),
  EMU_STICKER: z.string().min(10),
  EMU_CHANCE: z.number().min(0).max(100).default(1),
});

export const environment = environmentSchema.parse(process.env);
