import { StatusCodes } from "http-status-codes";
import { BadRequestError, unauthenticatedError } from "../errors/index.js";

import User from "../models/user.js";


const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    throw new BadRequestError("Please provide all values");

  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists)
    throw new BadRequestError("Email address already in use");

  const user = await User.create({ name, email, password });
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
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
  const { email, password } = req.body;

  if (!email || !password)
    throw new BadRequestError("Please provide all values");

  const user = await User.findOne({ email }).select("+password");
  if (!user) 
    throw new unauthenticatedError("Invalid credentials");

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) 
    throw new unauthenticatedError("Invalid credentials");

  const token = user.createJWT();
  user.password = undefined;

  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

const updateUser = async (req, res) => {
  res.send("Update user");
};

export { register, login, updateUser };
