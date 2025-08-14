import { z } from "zod";

export const CreateAlgorithmSchema = z.object({
  title: z.string(),  
  description: z.string(),
  qubit: z.number(),
  column: z.number(),
  data: z.object(),
});

export const UpdateAlgorithmSchema = z.object({
  id: z.number(),
  title: z.string(),  
  description: z.string(),
  qubit: z.number(),
  column: z.number(),
  data: z.object(),
});

export const DeleteAlgorithmSchema = z.object({
  id: z.number(),
});

export type CreateAlgorithmInput = z.infer<typeof CreateAlgorithmSchema>;
export type UpdateAlgorithmInput = z.infer<typeof UpdateAlgorithmSchema>;
export type DeleteAlgorithmInput = z.infer<typeof DeleteAlgorithmSchema>;