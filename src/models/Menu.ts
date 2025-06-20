import { Document, Schema, Types, model } from "mongoose";

interface IMenuRoles {
    type: "Administrador" | "Cliente" | "Empleado";
}

export interface IMenu extends Document {
    _id: Types.ObjectId;
    label: string;
    path: string;
    icon: string;
    roles: IMenuRoles[];
}

const menuRolesSchema = new Schema<IMenuRoles>({
    type: {
        type: String,
        enum: [ "Administrador", "Cliente", "Empleado" ],
        required: true
    }
}, { versionKey: false });

const menuSchema = new Schema<IMenu>({
    label: { 
        type: String, 
        required: true 
    },
    path: { 
        type: String, 
        required: true 
    },
    icon: { 
        type: String, 
        required: true 
    },
    roles: {
        type: [menuRolesSchema],
        required: true,
        validate: [(array: string | any[]) => array.length > 0, 'Debe contener al menos un rol']
    }
}, { versionKey: false });

export const Menu = model<IMenu>("Menu", menuSchema, "menu");