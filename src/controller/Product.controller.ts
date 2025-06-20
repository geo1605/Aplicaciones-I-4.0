import { Request, Response } from 'express';
import { Product } from '../models/Product';

// ➕ Crear producto
export const addProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, quantity, description } = req.body;

    const newProduct = new Product({
      Name: name,
      Price: price,
      Quantity: quantity,
      Description: description
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).json({ message: 'Error al crear el producto' });
  }
};

// 📄 Obtener todos los productos
export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ message: 'Error al obtener productos' });
  }
};

// 🔍 Obtener un producto por ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    res.status(500).json({ message: 'Error al obtener el producto' });
  }
};

// ✏️ Actualizar producto por ID
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price, quantity, description } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    product.Name = name ?? product.Name;
    product.Price = price ?? product.Price;
    product.Quantity = quantity ?? product.Quantity;
    product.Description = description ?? product.Description;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(500).json({ message: 'Error al actualizar el producto' });
  }
};

// ❌ Eliminar producto por ID
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    product.status = false; // Marcar como inactivo o eliminado
    await product.save();

    res.status(200).json({ message: 'Producto marcado como eliminado' });
  } catch (error) {
    console.error('Error al cambiar el estado del producto:', error);
    res.status(500).json({ message: 'Error al eliminar el producto' });
  }
};

