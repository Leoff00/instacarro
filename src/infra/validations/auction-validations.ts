import z from "zod";

const Bidder = z.object({
  name: z.string(),
  lastname: z.string(),
  offer: z.number().multipleOf(0.01),
  email: z.string().email(),
});

export const createAuctionSchema = z.object({
  email: z.string().email(),
  licensePlate: z.string().length(7),
  maxOffer: z.number().multipleOf(0.01),
  minOffer: z.number().min(200),
  startDate: z.string().transform((str) => new Date(str)),
  endDate: z.string().transform((str) => new Date(str)),
});

export const submitBidSchema = z.object({
  bidder: Bidder,
});

export const submitBidParamSchema = z.object({
  licensePlate: z.string().length(7),
});

export const finishBidSchema = z.object({
  licensePlate: z.string().length(7),
});

export const listVehicleBidsSchema = z.object({
  licensePlate: z.string().length(7),
});

export type CreateAuctionBody = z.infer<typeof createAuctionSchema>;
export type SubmitBidBody = z.infer<typeof submitBidSchema>;
export type SubmitBidParam = z.infer<typeof submitBidParamSchema>;
export type FinishBidParam = z.infer<typeof finishBidSchema>;
export type ListVehicleBidsBody = z.infer<typeof listVehicleBidsSchema>;
