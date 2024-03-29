import z from "zod";

export const createCarSchema = z.object({
  model: z.string(),
  licensePlate: z.string().length(7),
  name: z.string(),
  manufacture: z.string(),
  price: z.number().multipleOf(0.01),
});

export type CreateCarBody = z.infer<typeof createCarSchema>;
