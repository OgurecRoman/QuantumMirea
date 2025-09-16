import { z } from "zod";
import { JobsType } from '@prisma/client'

export const ConfigurationSchema = z.object({
  id: z.string(),  
  job: z.nativeEnum(JobsType),
});

export type ConfigurationInput = z.infer<typeof ConfigurationSchema>;