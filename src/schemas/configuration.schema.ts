import { z } from "zod";
import { JobsType, ComputerType } from '@prisma/client'

export const ConfigurationSchema = z.object({
  id: z.string(),  
  name: z.string(),  
  job: z.nativeEnum(JobsType),
  type: z.nativeEnum(ComputerType)
});

export type ConfigurationInput = z.infer<typeof ConfigurationSchema>;