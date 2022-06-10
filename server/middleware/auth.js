import jwt from "jsonwebtoken";

import { UnauthenticatedError } from "../errors/index.js";


const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const secret = process.env.JWT_SECRET;

  if (!authHeader || !authHeader.startsWith("Bearer"))
    throw new UnauthenticatedError("Authentication failed");

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, secret);
    req.user = payload;
    next();
  } catch (err) {
    throw new UnauthenticatedError("Authentication failed");
  }
};

export default auth;
