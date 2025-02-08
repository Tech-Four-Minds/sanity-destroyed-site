import { Router } from "express";
import { UserController } from "../../controllers/users/userController";

export const userRoutes = () => {

    const userController = new UserController();
    
    const routerUser = Router();

    routerUser.post("/users/", userController.createUser.bind(userController))

    return routerUser
}