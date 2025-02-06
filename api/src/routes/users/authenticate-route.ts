import { Router } from "express";
import { AuthController } from "../../controllers/users/authenticateController";


export const authRoutes = () => {
  const authController = new AuthController();

  const routerAuth = Router();

  routerAuth.post("/login", authController.login.bind(authController));

  return routerAuth;
};
