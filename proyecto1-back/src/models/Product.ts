import { Document, Schema, Types, model } from 'mongoose';

export interface IProduct extends Document {
    id: Types.ObjectId;
    Name: string;
    Price: number;
    Quantity: number;
    status: boolean;
    Description: string;
    CreateDate: Date;
    deleteDate: Date | null;
}

const ProductSchema = new Schema<IProduct>({
    Name: {
    type:String,
    required: true,
    unique: true
    },
    Price: {
        type: Number,
        required: true,
    },
    Quantity: {
        type: Number,
        required: true,
        min: 1
    },
    status: {
        type: Boolean,
        default: true
    },
    CreateDate: {
        type: Date,
        default: Date.now
    },
    deleteDate: {
        type: Date,
        default: null
    },
    Description: {
        type: String,
        required: true,
    },
})

export const Product = model<IProduct>('Product', ProductSchema, 'product');