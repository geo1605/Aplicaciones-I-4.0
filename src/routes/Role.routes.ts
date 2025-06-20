import { Router } from "express";
import { addRole } from "../controller/Role.controller";

const route = Router();

route.post("/addrole", addRole);

export default route;