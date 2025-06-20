import { Request, Response } from 'express';
import { Order } from '../models/Order';
import mongoose from 'mongoose';

export const addOrder = async (req: Request, res: Response) => {
    try {
        const { idUser, status, products } = req.body;

        // Validación básica
        if (!idUser || !products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: 'idUser y products son requeridos.' });
        }

        // Convertir idUser a ObjectId
        const userId = new mongoose.Types.ObjectId(idUser);

        // Convertir productId de cada producto a ObjectId
        const productsWithObjectId = products.map((p: any) => ({
            productId: new mongoose.Types.ObjectId(p.productId),
            quantity: p.quantity,
            price: p.price,
        }));

        const newOrder = new Order({
            idUser: userId,
            status,
            products: productsWithObjectId,
        });

        await newOrder.save();
        res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Error creating order', error });
    }
};


export const updateOrder = async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const { status, products } = req.body;

    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Validar y actualizar status si se envía
        if (status) {
            order.status = status;
        }

        // Validar y actualizar productos si se envían
        if (products && Array.isArray(products) && products.length > 0) {
            order.products = products.map((p: any) => ({
                productId: new mongoose.Types.ObjectId(p.productId),
                quantity: p.quantity,
                price: p.price
            }));
        }

        const updatedOrder = await order.save();
        return res.status(200).json({
            message: "Order updated successfully",
            order: updatedOrder
        });
    } catch (error) {
        console.error("Error updating order:", error);
        return res.status(500).json({
            message: "Error updating order",
            error
        });
    }
};


export const deleteOrder = async(req: Request,res: Response) => {
    //Cancelado
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order){
        return res.status(404).json({ message: "Order not found"});
    }

    order.status="Cancelado";

    const orderPaid = await order.save();
    return res.json({ orderPaid });
}

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find();
    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({
      message: "Error fetching orders",
      error,
    });
  }
};