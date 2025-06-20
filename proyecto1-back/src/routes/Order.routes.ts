import { Router } from "express";
import { addOrder, getOrders, deleteOrder, updateOrder } from "../controller/Order.controller";
const route = Router();

// Crear una orden
route.post("/addOrder", addOrder);

// Obtener todas las órdenes
route.get("/orders", getOrders);

// Actualizar orden como "Pagado"
route.put("/updateOrder/:orderId", updateOrder);

// Cancelar una orden (cambiar a "Cancelado")
route.delete("/deleteOrder/:orderId/cancel", deleteOrder);

export default route;