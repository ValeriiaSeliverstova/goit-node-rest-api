import { createToken } from "../helpers/jwt.js";
import {
  registerUser,
  verifyUserEmail,
  resendVerifyEmail,
  loginUser,
  logoutUser,
  refreshUser,
  updateAvatar,
} from "../services/authServices.js";

export const registerController = async (req, res) => {
  const newUser = await registerUser(req.body);

  res.status(201).json({
    email: newUser.email,
    subscription: "starter",
  });
};

export const verifyEmailController = async (req, res) => {
  const { verificationToken } = req.params;
  await verifyUserEmail(verificationToken);
  res.status(200).json({ message: "Email successfully verified" });
};

export const resendVerifyEmailController = async (req, res) => {
  await resendVerifyEmail(req.body);
  res.status(200).json({ message: "Verification email sent again" });
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

export const updateAvatarController = async (req, res) => {
  await updateAvatar(req.user, req.file);
  res.status(200).json({ avatarURL: req.user.avatarURL });
};
