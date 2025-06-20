// models/Role.ts
import { Schema, Document } from "mongoose";

// Interfaz del subdocumento Role
export interface IRole {
  name: string;
  type: string;
  status: boolean;
}

// Subesquema sin _id para usar como embebido en User
export const roleSubSchema = new Schema<IRole>(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    status: { type: Boolean, default: true }
  },
  { _id: false }
);
