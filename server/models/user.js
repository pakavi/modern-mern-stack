import mongoose from "mongoose";
import validator from "validator";
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

const User = mongoose.model("User", UserSchema);

export default User;
