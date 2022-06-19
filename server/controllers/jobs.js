import { StatusCodes } from "http-status-codes";

import Job from "../models/job.js";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";


const getAllJobs = async (req, res) => {
  res.send("Get all jobs");
};

const createJob = async (req, res) => {
  const { position, company } = req.body;

  if (!position || !company)
    throw new BadRequestError("Please provide all values");

  req.body.createdBy = req.user.userId;

  const job = Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  res.send("Update job");
};

const deleteJob = async (req, res) => {
  res.send("Delete job");
};

const showStats = async (req, res) => {
  res.send("Show stats");
};

export { getAllJobs, createJob, updateJob, deleteJob, showStats };
