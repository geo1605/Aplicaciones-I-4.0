import { Document, model, Schema, Types } from "mongoose";

// Estructura del producto dentro de la orden
export interface IOrderProduct {
  productId: Types.ObjectId;
  quantity: number;
  price: number;
}

// Estructura del documento Order
export interface IOrder extends Document {
  idUser: Types.ObjectId;
  status: string;
  products: IOrderProduct[];
  createdAt?: Date;
  subtotal: number;
  total: number;
}

const orderProductSchema = new Schema<IOrderProduct>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const orderSchema = new Schema<IOrder>(
  {
    idUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      default: "Pendiente",
    },
    products: {
      type: [orderProductSchema],
      required: true,
      validate: {
        validator: (array: IOrderProduct[]) => array.length > 0,
        message: "Debe incluir al menos un producto.",
      },
    },
    subtotal: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: false } }
);

// Middleware para calcular subtotal y total antes de guardar
orderSchema.pre("save", function (next) {
  const order = this as IOrder;

  const subtotal = order.products.reduce((sum, item) => {
    return sum + item.quantity * item.price;
  }, 0);

  order.subtotal = subtotal;
  const IVA = 0.16;
  order.total = +(subtotal * (1 + IVA)).toFixed(2);

  next();
});

export const Order = model<IOrder>("Order", orderSchema, "order");