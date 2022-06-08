import express from "express";
import "express-async-errors";
import cors from "cors";

import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";

import connectDB from "./db/connectDB.js";

import authRouter from "./routes/auth.js";
import jobsRouter from "./routes/jobs.js";

import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();


if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));

app.use(express.json());
app.use(helmet());
app.use(cors());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRouter);

app.use(notFound);
app.use(errorHandler);

const connect = async () => {
  const port = process.env.MONGO_PORT || 5000;

  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Server is listening on port ${port}`));
  } catch (err) {
    console.error(err.message);
  }
};

connect();
