import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";

import User from "../models/user.js";


const register = async (req, res) => {
  const { name, email, password } = req.body;
  const userAlreadyExists = await User.findOne({ email });

  if (!name || !email || !password)
    throw new BadRequestError("Please provide all values");

  if (userAlreadyExists)
    throw new BadRequestError("Email address already in use");

  const user = await User.create({ name, email, password });
  const token = user.createJWT();

  res
    .status(StatusCodes.CREATED)
    .json({
      user: {
        name: user.name,
        email: user.email,
        lastName: user.lastName,
        location: user.location,
      },
      token,
      location: user.location,
    });
};

const login = async (req, res) => {
  res.send("Login user");
};

const updateUser = async (req, res) => {
  res.send("Update user");
};

export { register, login, updateUser };
