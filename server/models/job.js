import mongoose, { Mongoose } from "mongoose";


const Schema = mongoose.Schema;

const JobSchema = Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide company value"],
      maxLength: 50,
    },
    position: {
      type: String,
      required: [true, "Please provide position value"],
      maxLength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "remote", "internship"],
      default: "full-time",
    },
    jobLocation: {
      type: String,
      required: [true, "Please provide job location value"],
      default: "my city",
    },
    createdBy: {
      type: Mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", JobSchema);

export default Job;
