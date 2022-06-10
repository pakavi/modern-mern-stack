import express from "express";

import authenticateUser from "../middleware/auth.js";
import { register, login, updateUser } from "../controllers/auth.js";


const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/updateUser").patch(authenticateUser, updateUser);

export default router;
