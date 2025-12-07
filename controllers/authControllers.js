import { createToken } from "../helpers/jwt.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUser,
} from "../services/authServices.js";

export const registerController = async (req, res) => {
  const newUser = await registerUser(req.body);

  res.status(201).json({
    email: newUser.email,
    subscription: "starter",
  });
};

export const loginController = async (req, res) => {
  const token = await loginUser(req.body);
  res.status(200).json({ token });
};

export const getCurrentUserController = async (req, res) => {
  const result = await refreshUser(req.user);
  res.json(result);
};

export const logoutController = async (req, res) => {
  await logoutUser(req.user);
  res.status(204).send();
};
