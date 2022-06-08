import mongoose from "mongoose";

import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


const Schema = mongoose.Schema;

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, "Please provide name value"],
    minLength: 3,
    maxLength: 20,
    trim: true,
  },
  lastName: {
    type: String,
    maxLength: 20,
    trim: true,
    default: "Doe",
  },
  email: {
    type: String,
    required: [true, "Please provide email value"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide valid email address",
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password value"],
    minLength: 6,
    select: false,
  },
  location: {
    type: String,
    maxLength: 20,
    trim: true,
    default: "New York",
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  const secret = process.env.JWT_SECRET;
  const lifetime = process.env.JWT_LIFETIME;

  return jwt.sign({ userId: this._id }, secret, { expiresIn: lifetime });
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
}

const User = mongoose.model("User", UserSchema);

export default User;
