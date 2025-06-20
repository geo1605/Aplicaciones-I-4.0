// models/User.ts
import { Schema, Document, model } from "mongoose";
import { roleSubSchema, IRole } from "./Role";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  status: boolean;
  createDate: Date;
  deleteDate: Date | null;
  role: IRole;
  firstName: string;
  lastName: string;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  status: { type: Boolean, default: true },
  createDate: { type: Date, default: Date.now },
  deleteDate: { type: Date, default: null },
  role: { type: roleSubSchema, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true }
});

export const User = model<IUser>("User", userSchema, "user");
