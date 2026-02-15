import mongoose, { Schema, model, models } from "mongoose";

const JobSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: String },
    companyName: { type: String, required: true },
    clerkId: { type: String, required: true },
    category: { type: String },
  },
  { timestamps: true },
);

const Job = models.Job || model("Job", JobSchema);
export default Job;
