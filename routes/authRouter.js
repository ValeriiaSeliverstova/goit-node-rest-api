import { Router } from "express";
import validateBody from "../helpers/validateBody.js";
import { registerSchema, loginSchema } from "../schemas/authSchemas.js";
import {
  registerController,
  loginController,
  getCurrentUserController,
  logoutController,
} from "../controllers/authControllers.js";

import authenticate from "../middlewares/authenticate.js";

const authRouter = Router();

authRouter.post("/register", validateBody(registerSchema), registerController);

authRouter.post("/login", validateBody(loginSchema), loginController);

authRouter.post("/logout", authenticate, logoutController);

authRouter.get("/current", authenticate, getCurrentUserController);

export default authRouter;
