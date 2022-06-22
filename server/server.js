import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";

import "express-async-errors";
import helmet from "helmet";
import cors from "cors";

import connectDB from "./db/connectDB.js";
import authRouter from "./routes/auth.js";
import jobsRouter from "./routes/jobs.js";

import errorHandler from "./middleware/errorHandler.js";
import authenticateUser from "./middleware/auth.js";
import notFound from "./middleware/notFound.js";

import populateDB from "./data/data.js";


dotenv.config();

const app = express();

if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));

app.use(express.json());
app.use(helmet());
app.use(cors());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

app.use(notFound);
app.use(errorHandler);


populateDB();

const connect = async () => {
  const url = process.env.MONGO_URL;
  const port = process.env.MONGO_PORT || 5000;

  try {
    await connectDB(url);
    app.listen(port, () => console.log(`Server is listening on port ${port}`));
  } catch (err) {
    console.error(err.message);
  }
};

connect();
