import mongoose, { Document, Schema } from "mongoose";

export interface CarInterfaceDoc extends Document {
  carModel: string;
  licensePlate: string;
  name: string;
  manufacture: string;
  price: number;
}

const CarSchema = new Schema<CarInterfaceDoc>({
  carModel: { type: String, required: true },
  licensePlate: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  manufacture: { type: String, required: true },
  price: { type: Number, required: true },
});

export const CarModel = mongoose.model<CarInterfaceDoc>("Car", CarSchema);
