import { Router } from "express";
import validateBody from "../helpers/validateBody.js";
import {
  registerSchema,
  verifyEmailSchema,
  loginSchema,
} from "../schemas/authSchemas.js";
import {
  registerController,
  verifyEmailController,
  resendVerifyEmailController,
  loginController,
  getCurrentUserController,
  logoutController,
  updateAvatarController,
} from "../controllers/authControllers.js";
import upload from "../middlewares/upload.js";

import authenticate from "../middlewares/authenticate.js";

const authRouter = Router();

authRouter.post("/register", validateBody(registerSchema), registerController);

authRouter.get("/verify/:verificationToken", verifyEmailController);

authRouter.post(
  "/verify",
  validateBody(verifyEmailSchema),
  resendVerifyEmailController
);

authRouter.post("/login", validateBody(loginSchema), loginController);

authRouter.post("/logout", authenticate, logoutController);

authRouter.get("/current", authenticate, getCurrentUserController);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  updateAvatarController
);

export default authRouter;
