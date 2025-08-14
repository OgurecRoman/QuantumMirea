import { z } from "zod";

export const CreateGateSchema = z.object({
  title: z.string(),
  description: z.string(),
  complexOneOne: z.number(),
  complexOneTwo: z.number(),  
  complexTwoOne: z.number(),  
  complexTwoTwo: z.number(),  
  complexThreeOne: z.number(),  
  complexThreeTwo: z.number(),  
  complexFourOne: z.number(), 
  complexFourTwo: z.number(),  
});

export const UpdateGateSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  complexOneOne: z.number(),
  complexOneTwo: z.number(),  
  complexTwoOne: z.number(),  
  complexTwoTwo: z.number(),  
  complexThreeOne: z.number(),  
  complexThreeTwo: z.number(),  
  complexFourOne: z.number(), 
  complexFourTwo: z.number(),  
});

export const DeleteGateSchema = z.object({
  id: z.number(),
});

export const CreateCompositeGateSchema = z.object({
  title: z.string(),
  description: z.string(),
  gates: z.object(),
});

export const UpdateCompositeGateSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  gates: z.object(), 
  authorId: z.number(),
});

export const DeleteCompositeGateSchema = z.object({
  id: z.number(),
});

export type CreateGateInput = z.infer<typeof CreateGateSchema>;
export type UpdateGateInput = z.infer<typeof UpdateGateSchema>;
export type DeleteGateInput = z.infer<typeof DeleteGateSchema>;

export type CreateCompositeGateInput = z.infer<typeof CreateCompositeGateSchema>;
export type UpdateCompositeGateInput = z.infer<typeof UpdateCompositeGateSchema>;
export type DeleteCompositeGateInput = z.infer<typeof DeleteCompositeGateSchema>;