import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    userName: String,
    email: { type: String, unique: true, require: true },
    password: String,
    age: Number,
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
    },
    phone: String,
    deletedAt: Date
  },
  { timestamps: true }
);

export const userModel = model("user", userSchema);
