import { Schema } from "mongoose";

export interface IUser {
  email: string;
  name: string;
  joinedDate: Date;
  tier: number;
  subscribed: boolean;
  currentAlg: number;
  timezone: string;
}

export const userSchema = new Schema<IUser>({
  email: {
    required: true,
    type: String,
  },
  name: {
    required: false,
    type: String,
  },
  joinedDate: {
    required: true,
    type: Date,
    default: Date.now(),
  },
  tier: {
    required: true,
    type: Number,
    default: 1,
  },
  subscribed: {
    required: true,
    type: Boolean,
    default: false,
  },
  currentAlg: {
    required: true,
    type: Number,
    default: 1,
  },
  timezone: {
    required: true,
    type: String,
    default: "America/Vancouver",
  },
});