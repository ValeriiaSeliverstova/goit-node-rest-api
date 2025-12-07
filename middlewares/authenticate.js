import HttpError from "../helpers/HttpError.js";
import { verifyToken } from "../helpers/jwt.js";
import { findUser } from "../services/authServices.js";

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "Authorization header is missing" });
  }

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    throw HttpError(401, "Authorization header must start with Bearer");
  }

  const { data, error } = verifyToken(token);
  if (error) {
    throw HttpError(401, error.message);
  }

  const user = await findUser({ id: data.id });
  if (!user) {
    throw HttpError(401, "User not found");
  }

  if (!user.token) {
    throw HttpError(401, "User is not authorized");
  }
  req.user = user;
  next();
};

export default authenticate;
