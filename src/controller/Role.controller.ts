import { Request, Response } from 'express';
import { Role } from '../models/Role'; // Ajusta la ruta según tu estructura

export const addRole = async (req: Request, res: Response) => {
    try {
        console.log('Body recibido:', req.body);

        const { name, type } = req.body;

        if (!name || !type) {
            return res.status(400).json({ message: 'name y type son requeridos' });
        }

        const role = new Role({
            Name: name,
            Type: type
        });

        const savedRole = await role.save();
        return res.status(201).json(savedRole);
    } catch (error) {
        console.error('Error al guardar el rol:', error);
        return res.status(500).json({ message: 'Error al guardar el rol' });
    }
};
