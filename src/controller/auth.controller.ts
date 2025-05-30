import { Request, Response } from "express";
import { cache } from "../utils/cache";
import { accessGenToken, accessVerifyToken } from "../utils/token";
import dayjs from "dayjs";
import { User } from "../models/User";
import bcrypt from "bcrypt";


export const loginMethod = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const userId = (user._id as any).toString(); // para evitar el error de TS
    const accessToken = accessGenToken(userId);
    cache.set(userId, accessToken, 15 * 60); // Expira en 15 minutos

    // ✅ Aquí se responde correctamente al cliente
    return res.status(200).json({ accessToken });
  } catch (error) {
    return res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};

export const getTimeToken = (req: Request, res: Response) => {
    const { userId } = req.params; //extrae el userId de los parámetros de la URL
    const authHeader = req.headers["authorization"]; //obtiene el encabezado de autorización
    const token = authHeader?.split(" ")[1]; //separa el token del encabezado

    if (!token) { //verifica si el token no está presente
        return res.status(401).json({ error: "Token no proporcionado" });
    }

    try {
        const decoded = accessVerifyToken(token);//verifica el token
        if (decoded.userId !== userId) { //compara el userId del token con el userId de los parámetros
            return res.status(403).json({ error: "Token no válido para este usuario" });
        }
        const ttl = cache.getTtl(userId);
        if (!ttl) {
            return res.status(404).json({ error: "Token no encontrado" });
        }

        const now = Date.now();
        const timeToLife = Math.floor((ttl - now) / 1000);
        const expTime = dayjs(ttl).format("HH:mm:ss");
        return res.json({ timeToLife, expTime });
    } catch (err) {
        return res.status(403).json({ error: "Token inválido o expirado" });
    }
};
export const updateToken = (req: Request, res: Response) => {
    const { userId } = req.params;
    const ttl = cache.getTtl(userId);
        if (!ttl) {
            return res.status(404).json({ error: "Token no encontrado" });
        }
    const newTimeToken: number = 60 * 15;
    cache.ttl(userId, newTimeToken); //actualiza el tiempo de vida del token

    res.json({ message: "Tiempo de vida del token actualizado" });
}


//consultas
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
};

export const getUserByUsername = async (req: Request, res: Response) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: `Usuario con username '${username}' no encontrado` });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar el usuario', error });
  }
};

//agregar
export const addUser = async (req: Request, res: Response) => {
  const { username, firstName, lastName, email, password, role } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar el usuario', error });
  }
};


export const updateUser = async (req: Request, res: Response) => {
  const { username } = req.params;
  const { firstName, lastName, email, password, role } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;

    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: 'El correo ya está registrado por otro usuario' });
      }
      user.email = email;
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    if (role) user.role = role;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario', error });
  }
};



export const deleteUser = async (req: Request, res: Response) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    user.status = false; // Desactivar usuario
    await user.save();

    res.status(200).json({ message: 'Usuario desactivado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario', error });
  }
};
