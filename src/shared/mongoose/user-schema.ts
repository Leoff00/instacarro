import mongoose, { Document, Schema } from "mongoose";

export interface UserInterfaceDoc extends Document {
  name: string;
  lastname: string;
  email: string;
  createdAt: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<UserInterfaceDoc>(
  {
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    createdAt: { type: Date },
    updatedAt: { type: Date, default: null },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const UserModel = mongoose.model<UserInterfaceDoc>("User", UserSchema);
