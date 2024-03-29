import z from "zod";

const Bidder = z.object({ name: z.string(), lastname: z.string() });

export const createAuctionSchema = z.object({
  model: z.string(),
  licensePlate: z.string().length(7),
  name: z.string(),
  manufacture: z.string(),
  price: z.number().multipleOf(0.01),
});

export const submitBidSchema = z.object({
  id: z.string().uuid(),
  bidder: Bidder,
  email: z.string().email(),
  licensePlate: z.string().length(7),
  currentOffer: z.number().multipleOf(0.01),
});

export const finishBidSchema = z.object({
  email: z.string().email(),
  licensePlate: z.string().length(7),
});

export const listVehicleBidsSchema = z.object({
  licensePlate: z.string().length(7),
});

export type CreateAuctionBody = z.infer<typeof createAuctionSchema>;
export type SubmitBidBody = z.infer<typeof submitBidSchema>;
export type FinishBidBody = z.infer<typeof finishBidSchema>;
export type ListVehicleBidsBody = z.infer<typeof listVehicleBidsSchema>;
