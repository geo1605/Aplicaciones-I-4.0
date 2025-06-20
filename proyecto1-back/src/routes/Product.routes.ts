import { Router } from "express";
import {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from '../controller/Product.controller';

const route = Router();

route.post("/addProduct", addProduct);
route.get('/', getAllProducts);
route.get('/:id', getProductById);
route.put('/:id', updateProduct);
route.delete('/:id', deleteProduct);

export default route;