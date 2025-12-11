import User from "../db//models/User.js";
import bcrypt from "bcrypt";
import HttpError from "../helpers/HttpError.js";
import { createToken } from "../helpers/jwt.js";
import * as fs from "node:fs/promises";
import path from "node:path";
import createAvatar from "../helpers/createAvatar.js";
import sendEmail from "../helpers/sendEmail.js";
import { nanoid } from "nanoid";

const { PUBLIC_URL } = process.env;

const avatarsDir = path.resolve("public", "avatars");

export const findUser = (where) => User.findOne({ where });

export const registerUser = async (payload) => {
  const avatarURL = createAvatar(payload.email);
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const user = await User.create({
    ...payload,
    password: hashedPassword,
    verificationToken: nanoid(),
    avatarURL,
  });

  const verifyEmail = {
    to: payload.email,
    subject: "Verify your email",
    html: `<a href="${PUBLIC_URL}/api/auth/verify/${user.verificationToken}">Click to verify your email</a>`,
  };

  await sendEmail(verifyEmail);

  return user;
};

export const verifyUserEmail = async (verificationToken) => {
  const user = await findUser({ verificationToken });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  await user.update({ verify: true, verificationToken: null });
};

export const resendVerifyEmail = async ({ email }) => {
  const user = await findUser({ email });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  if (user.verify) {
    throw HttpError(400, "Email is already verified");
  }

  const verifyEmail = {
    to: user.email,
    subject: "Verify your email",
    html: `<a href="${PUBLIC_URL}/api/auth/verify/${user.verificationToken}">Click to verify your email</a>`,
  };

  await sendEmail(verifyEmail);

  return user;
};

export const loginUser = async ({ email, password }) => {
  const user = await findUser({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw HttpError(401, "Email is not verified");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user.id,
  };

  const token = createToken(payload);
  await user.update({ token });
  return {
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  };
};

export const refreshUser = async (user) => {
  const token = createToken({ id: user.id });
  await user.update({ token });
  return {
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  };
};

export const logoutUser = async (user) => {
  await user.update({ token: null });
};

export const updateAvatar = async (user, file) => {
  let avatar = null;
  if (file) {
    const newPath = path.join(avatarsDir, file.filename);
    await fs.rename(file.path, newPath);
    avatar = path.join("public", "avatars", file.filename);
  }

  return user.update({ avatarURL: avatar });
};
