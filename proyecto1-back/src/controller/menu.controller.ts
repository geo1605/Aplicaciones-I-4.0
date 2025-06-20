import { Request, Response } from "express";
import { Menu } from "../models/Menu";

export const createMenu = async (req: Request, res: Response) => {
    try {
        const { label, path, icon, roles } = req.body;

        const newMenu = new Menu(req.body);
        const menu = await newMenu.save();

        return res.status(201).json({ message: "Menú creado exitosamente", menu });
    } catch (error: any) {
        return res.status(400).json({ message: "Error al crear menú", error: error.message || error });
    }
};

export const getMenuRol = async (req: Request, res: Response) => {
    try {
        const { type } = req.params;  
        const menus = await Menu.find({ "roles.type": type });

        return res.status(200).json({ message: "Menús encontrados", menus });
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener menús", error });
    }
};