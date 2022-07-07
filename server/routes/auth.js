import express from "express";
import rateLimiter from "express-rate-limit";

import authenticateUser from "../middleware/auth.js";
import { register, login, updateUser } from "../controllers/auth.js";


const apiLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: "Too many requests, please try again after 15 minutes",
});


const router = express.Router();

router.route("/login").post(apiLimiter, login);
router.route("/register").post(apiLimiter, register);
router.route("/updateUser").patch(authenticateUser, updateUser);

export default router;
