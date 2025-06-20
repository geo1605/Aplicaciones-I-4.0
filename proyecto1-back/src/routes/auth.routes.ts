import { Router } from "express";
import { loginMethod, getTimeToken, updateToken, getAllUsers, getUserByUsername, addUser, updateUser, deleteUser } from "../controller/auth.controller";
import { createMenu, getMenuRol } from "../controller/menu.controller";

const route = Router();

route.post("/login", loginMethod);
route.get("/time/:userId", getTimeToken);
route.put("/update/:userId", updateToken);
route.get("/users", getAllUsers);
route.get("/users/:username", getUserByUsername);
route.post("/adduser", addUser);
route.put("/updateU/:username", updateUser);
route.delete("/deleteU/:username", deleteUser);


router.post('/createMenu', createMenu);
router.get('/getMenu/:type', getMenuRol);

export default route;
